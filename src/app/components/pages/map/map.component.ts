import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { AutocompleteService } from '../../../services/maps/autocomplete.service';
import { MapsAPILoader } from '@agm/core';
import { Tax } from 'src/app/models/map/tax.class';
import { CalculatorService } from '../../../services/maps/calculator.service';
import {MatDialog} from '@angular/material';
import { TaxDialogComponent } from './tax-dialog.component';
import { PartialObserver } from 'rxjs';
import { GraphicalsOrdersService } from '../../../services/maps/graphicals-orders.service';
import { MAP_INTERFACE } from 'src/app/Routes/routes';
import * as $ from 'jquery';
import { Socket } from 'ngx-socket-io';
import { ServiceComponent } from './service.component';

// declare function GetRoutingId(content): string;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('from')
  public searchElementRef: ElementRef;
  @ViewChild('to')
  public searchElementRef2: ElementRef;
  /*Theme */
  public MapStyles = MAP_INTERFACE;

  lat: number;
  public title: 'hola';
  lng: number;
  zoom: number;
  public GraphicOrders: any[] = [];
  public onTracking: boolean = false;
  public renderOption = {
    suppressMarkers: true,
  };
  public markerOptions = {
    origin: {
        icon: './assets/images/map/destination.png',
        draggable: false,
        opacity: 1,
    },
    destination: {
        icon: './assets/images/map/baseline_zoom_out_map_white_48dp.png',
        opacity: 1,
        dragabble: false
    },
};
  constructor(public _mapAutocomplete: AutocompleteService, public _intelliSense: AutocompleteService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, public _calculator: CalculatorService, public dialog: MatDialog,
    private _graphicInTracking: GraphicalsOrdersService, private _socket: Socket) {
    this.lat = this._mapAutocomplete.lat;
    this.lng = this._mapAutocomplete.lng;
    this.zoom = this._mapAutocomplete.zoom;
    // Conectamos al socket
    this._socket.on('connect', () => {
      // Recibimos la data del servidor mediante un socket
      this._socket.on('TrackingData', (tracking) => {
        // Ahora mostramos toda esta data en el front con un popup
        this.OpenDialogTracking(tracking);
      });
    });
   }

  async ngOnInit() {
    const MyPosition = await this.getPosition();
    if (MyPosition) {
      this._mapAutocomplete.lat = MyPosition.coords.latitude;
      this._mapAutocomplete.lng = MyPosition.coords.longitude;
      this._mapAutocomplete.zoom = 12;
      this.lat = MyPosition.coords.latitude;
      this.lng = MyPosition.coords.longitude;
      this.zoom = 12;
    }
    this.loadCustomerOrders();
    setTimeout((): void => {this.triggerButton(); }, 1000);
  }

  private getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(position);
        });
      } else {
        resolve(false);
      }
    });
  }
  LoadPLacesFrom() {
    this.mapsAPILoader.load().then((): void => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', (): void => {
        this.ngZone.run((): void => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this._intelliSense.lat = place.geometry.location.lat();
          this._intelliSense.lng = place.geometry.location.lng();
          this._intelliSense.zoom = 12;
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this._intelliSense.origin.lat = this.lat;
          this._intelliSense.origin.lng = this.lng;
        });
      });
    });
  }
  LoadPLacesTo() {
    this.mapsAPILoader.load().then((): void => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef2.nativeElement, {
        types: ['geocode']
      });
      autocomplete.addListener('place_changed', async () => {
        this.ngZone.run(async () => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this._intelliSense.destiny.lat = place.geometry.location.lat();
          this._intelliSense.destiny.lng = place.geometry.location.lng();
          // Calculate distance
          // first we verify if exists two points
          if ((this._intelliSense.origin.lat !== 0) && (this._intelliSense.origin.lng !== 0)) {
            const distance = await this.getDistance(new google.maps.LatLng(
              this._intelliSense.origin.lat,
              this._intelliSense.origin.lng
            ), new google.maps.LatLng(
              this._intelliSense.destiny.lat,
               this._intelliSense.destiny.lng));
               this._calculator.AutomobileHook = await this.AutoMobileHook(distance);
               this._calculator.AutomobileFlat = await this.AutoMobileFlat(distance);
               /*this._calculator.MediumTruck = await this.MediumTruck(distance);
               this._calculator.HeavyTruck = await this.HeavyTruck(distance);
               console.log(this._calculator.Automobile);
               console.log(this._calculator.MediumTruck);
               console.log(this._calculator.HeavyTruck);*/
          }
        });
      });
    });
  }
  // Calculamos la distancia
  getDistance(from: google.maps.LatLng, to: google.maps.LatLng): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(google.maps.geometry.spherical.computeDistanceBetween(from, to));
    });
  }
  AutoMobileHook(distance: number): Promise<Tax> {
    return new Promise((resolve, reject) => {
      const toKM = (distance / 1000);
      const toMiles = Math.round((toKM * 0.62137));
      console.log(toMiles);
      let tax: number = 0;
      let extraMiles: number = 0;
      let TotalExtraMiles: number = 0;
      let distanceExtra: number = 0;
      if (toMiles <= 30) {
        tax = 72;
        extraMiles = 0;
        TotalExtraMiles = 0;
      } else {
        tax = 72;
        // Extra Miles
        TotalExtraMiles = Number((toMiles - 30) * 0.80);
        extraMiles = Number((toMiles - 30));
        tax +=  TotalExtraMiles;
        distanceExtra = (extraMiles * 0.80);
      }
      tax += (19.98); // Dispatch
      // woowtow Percent
      const wowtowFee: number = (tax * (10 / 100) + 19.98);
      const employerFee: number = (tax * 0.90);
      resolve(new Tax(
        extraMiles, TotalExtraMiles, (distanceExtra + 580), 19.98, tax,
        wowtowFee, employerFee, toMiles, null, null, this._intelliSense.origin.lat,
        this._intelliSense.origin.lng, this._intelliSense.destiny.lng, this._intelliSense.destiny.lat
      ));
    });
  }
  AutoMobileFlat(distance: number): Promise<Tax> {
    return new Promise((resolve, reject) => {
      const toKM = (distance / 1000);
      const toMiles = Math.round((toKM * 0.62137));
      let tax: number = 0;
      let extraMiles: number = 0;
      let TotalExtraMiles: number = 0;
      let distanceExtra: number = 0;
      if (toMiles <= 30) {
        tax = 82.80;
        extraMiles = 0;
        TotalExtraMiles = 0;
      } else {
        tax = 82.80;
        // Extra Miles
        TotalExtraMiles = Number((toMiles - 30) * 0.80);
        extraMiles = Number((toMiles - 30));
        tax +=  TotalExtraMiles;
        distanceExtra = (extraMiles * 0.80);
      }
      tax += (19.98); // Dispatch
      // woowtow Percent
      const wowtowFee: number = (tax * (10 / 100) + 19.98);
      const employerFee: number = (tax * 0.90);
      resolve(new Tax(
        extraMiles, TotalExtraMiles, (distanceExtra + 580), 19.98, tax,
        wowtowFee, employerFee, toMiles, null, null, this._intelliSense.origin.lat,
        this._intelliSense.origin.lng, this._intelliSense.destiny.lng, this._intelliSense.destiny.lat
      ));
    });
  }
  MediumTruck(distance: number): Promise<Tax> {
    return new Promise((resolve, reject) => {
      const toKM = (distance / 1000);
      const toMiles = Math.round((toKM * 0.62137));
      let tax: number = 0;
      let extraMiles: number = 0;
      let TotalExtraMiles: number = 0;
      let distanceExtra: number = 0;
      if (toMiles <= 30) {
        tax = 390;
        extraMiles = 0;
        TotalExtraMiles = 0;
        distanceExtra = 0;
      } else {
        tax = 390;
        // Extra Miles
        TotalExtraMiles = Number((toMiles - 30) * 1);
        extraMiles = Number((toMiles - 30));
        tax +=  TotalExtraMiles;
        distanceExtra = (extraMiles * 1);
      }
            tax += (19.98); // Dispatch
      // woowtow Percent
      const wowtowFee: number = (tax * (10 / 100) + 19.98);
      const employerFee: number = (tax * 0.90);
      resolve(new Tax(
        extraMiles, TotalExtraMiles, (distanceExtra + 580), 19.98, tax,
        wowtowFee, employerFee, toMiles, null, null, this._intelliSense.origin.lat,
        this._intelliSense.origin.lng, this._intelliSense.destiny.lng, this._intelliSense.destiny.lat
      ));
    });
  }
  HeavyTruck(distance: number): Promise<Tax> {
    return new Promise((resolve, reject) => {
      const toKM = (distance / 1000);
      const toMiles = Math.round((toKM * 0.62137));
      let tax: number = 0;
      let extraMiles: number = 0;
      let TotalExtraMiles: number = 0;
      let distanceExtra: number = 0;
      if (toMiles <= 30) {
        tax = 580;
        extraMiles = 0;
        TotalExtraMiles = 0;
        distanceExtra = 0;
      } else {
        tax = 580;
        // Extra Miles
        TotalExtraMiles = Number((toMiles - 30) * 1.20);
        extraMiles = Number((toMiles - 30));
        tax +=  TotalExtraMiles;
        distanceExtra = (extraMiles * 1.20);
      }
      tax += (19.98); // Dispatch
      // woowtow Percent
      const wowtowFee: number = (tax * (10 / 100) + 19.98);
      const employerFee: number = (tax * 0.90);
      resolve(new Tax(
        extraMiles, TotalExtraMiles, (distanceExtra + 580), 19.98, tax,
        wowtowFee, employerFee, toMiles, null, null, this._intelliSense.origin.lat,
        this._intelliSense.origin.lng, this._intelliSense.destiny.lng, this._intelliSense.destiny.lat
      ));
    });
  }
  // Dialog
  OpenDialog(dataDialog: Tax): void {
    this._calculator.displayPopTax = false;
    const dialogRef = this.dialog.open(TaxDialogComponent, {
      width: '600px',
      height: '400px',
      data: dataDialog
    });
    dialogRef.afterClosed().subscribe(
      (clientResult: PartialObserver<any> | any): void => {
        console.log('closed');
      }
    );
  }
  loadCustomerOrders() {
    this._graphicInTracking.customerOrders().subscribe(
      (graphicals: PartialObserver<any> | any): void => {
        if (graphicals.status) {
          this.GraphicOrders = graphicals.allOrder;
          // Verify if user have routes on tracking
          if (!this.GraphicOrders.length) {
            this.onTracking = false;
            return;
          }
          this.onTracking = true;
          // this._mapAutocomplete.lng = -115.1536815;
          // this._mapAutocomplete.lat = 36.1494499;
        }
      }
    );
  }
  triggerButton() {
    if (this.onTracking) {
      if (this.GraphicOrders.length >= 1) {
        for (const order of this.GraphicOrders) {
          $(document).ready((): void => {
            $(`button[data-bind=${order._id}]`).click((): void => {
              $('body').hide();
            });
          });
        }
      }
    }
  }
// Abrimos el contenedor para mostrar la data del servicio
OpenDialogTracking(RoutingData: any): void {
  this._calculator.displayPopTax = false;
  const Popup = this.dialog.open(ServiceComponent, {
    width: '600px',
    height: '700px',
    data: {
      RoutingData
    }
  });
  Popup.afterClosed().subscribe(
    (tracking: PartialObserver<any> | any): void => {
      this._calculator.displayPopTax = true;
      console.log(tracking);
    }
  );
}
}
