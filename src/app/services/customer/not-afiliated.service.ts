import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../models/customer/customer.class';
import { ENVIROMENT_LOCAL } from 'src/app/Routes/routes';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { ClientCar } from '../../models/customer/customer.car.class';

@Injectable({
  providedIn: 'root'
})
export class NotAfiliatedService {
  constructor(private _http: HttpClient) {}
  registerClient(clientData: Client) {
    return this._http.post(`${ENVIROMENT_LOCAL}/client/login`, clientData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError( (err: any)  => {
        console.error(err);
        return new Observable<string | boolean>();
      })
    );
  }
  registerClientCar(DataCar: ClientCar) {
    return this._http.post(`${ENVIROMENT_LOCAL}/client/car/model`, DataCar).pipe(
      map((response: any) => {
        return response;
      }),
      catchError( (err: any)  => {
        console.error(err);
        return new Observable<string | boolean>();
      })
    );
  }
}

