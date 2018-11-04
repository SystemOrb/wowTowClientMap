import { Injectable } from '@angular/core';
import { CustomerAfiliated } from '../../models/customer/customer.parent.class';
import { Router } from '@angular/router';
import { Client } from '../../models/customer/customer.class';
import { HttpClient } from '@angular/common/http';
import { ENVIROMENT_LOCAL } from 'src/app/Routes/routes';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs/internal/Observable';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _route: Router, private _http: HttpClient, private matSnack: MatSnackBar) {
      this.loadStorage();
   }
  public wowTowCustomer: CustomerAfiliated;
  public token: string;
  public _id: string;
  saveStorage(customer: CustomerAfiliated, token: string, _id: string): boolean {
    // Saved this customer on cache
    localStorage.setItem('wowtowCustomer', JSON.stringify(customer));
    localStorage.setItem('token', token);
    localStorage.setItem('_id', _id);
    this.wowTowCustomer = customer;
    this.token = token;
    this._id = _id;
    return true;
  }
  // Load storage
  loadStorage() {
    this.wowTowCustomer = JSON.parse(localStorage.getItem('wowtowCustomer')) || '';
    this.token = localStorage.getItem('token') || '';
    this._id = localStorage.getItem(this._id) || '';
  }
  // Verify Login Guard
  logged(): boolean {
    if (this._id === '' || this._id === undefined || this._id === null) {
      return false;
    } else {
      return true;
    }
  }
  // Logout customer
  logout() {
    localStorage.removeItem('wowtowCustomer');
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
    this.wowTowCustomer = null;
    this._id = '';
    this.token = '';
    this._route.navigate(['/public/login']);
  }
  login(customer: Client) {
    return this._http.post(`${ENVIROMENT_LOCAL}/client/login/auth`, customer).pipe(
      map((response: any) => {
        return response;
      }),
      catchError( (err: any)  => {
        this.matSnack.open('Ops! some credentials has been invalid', 'Try again!', {duration: 1000000});
        return new Observable<string | boolean>();
      })
    );
  }
  loginVehicle(keyCustomer: string) {
    return this._http.get(`${ENVIROMENT_LOCAL}/client/car/model/all/${keyCustomer}`).pipe(
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
