import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { AutocompleteService } from '../../../services/maps/autocomplete.service';
import { MapsAPILoader } from '@agm/core';
declare const google: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  @ViewChild('searchLocation')
  public searchElementRef: ElementRef;
  constructor(private _intelliSense: AutocompleteService, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {

  }
  LoadPLaces() {
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
        });
      });
    });
  }
}
