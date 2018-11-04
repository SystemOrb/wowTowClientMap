import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GOOGLE_PLACE, API_KEY_SERVER } from '../../Routes/routes';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AutoComplete } from '../../models/autocomplete.class';
import { Coords } from '../../models/map/coords.class';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {
  @Output() displayIntellisence: EventEmitter<AutoComplete[]> = new EventEmitter();
  public lat: number = 51.678418;
  public lng: number = 7.809007;
  public zoom: number = 4;
  public origin: Coords = {
    lat: 0,
    lng: 0
  };
  public destiny: Coords = {
    lat: 0,
    lng: 0
  };
  constructor(private _http: HttpClient) {
  }

}
