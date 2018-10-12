import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { AutocompleteService } from '../../../services/maps/autocomplete.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  title: string = 'My first AGM project';
  lat: number;
  lng: number;
  zoom: number;
  constructor(public _mapAutocomplete: AutocompleteService) {
    this.lat = this._mapAutocomplete.lat;
    this.lng = this._mapAutocomplete.lng;
    this.zoom = this._mapAutocomplete.zoom;
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
}
