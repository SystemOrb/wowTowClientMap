import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../customer/auth.service';
import { ENVIROMENT_LOCAL } from 'src/app/Routes/routes';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GraphicalsOrdersService {

  constructor(private _http: HttpClient, private _auth: AuthService) { }

  customerOrders() {
    const url = `${ENVIROMENT_LOCAL}/admin/payments/stripe/customer/graphic/${this._auth.wowTowCustomer.vehicle._id}`;
    return this._http.get(url).pipe(
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
