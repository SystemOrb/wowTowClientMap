import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/customer/auth.service';
import { Client } from 'src/app/models/customer/customer.class';
import { PartialObserver } from 'rxjs';
import { CustomerAfiliated } from '../../../../models/customer/customer.parent.class';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalid: boolean;
  loader: boolean = false;
  constructor(private _router: Router, public _auth: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  async afiliatedCustomer(Auth: NgForm) {
    if (Auth.invalid) {
      return;
    }
    const client = new Client(null, Auth.value.email, null, Auth.value.password);
    this.loader = true;
    const Authentication = await this.loginCustomer(client);
    if (Authentication.status) {
      const Vehicle = await this.loginVehicle(Authentication.client._id);
      if (Vehicle.status) {
        const vehicleSaved = Vehicle.vehicle[0];
        const Customer = Authentication.client;
        const savedStorage = new CustomerAfiliated(Customer, vehicleSaved);
        if (this._auth.saveStorage(savedStorage, Authentication.token, Authentication.client._id)) {
          // tslint:disable-next-line:max-line-length
          this.snackBar.open('Successful login',
          null, {
            duration: 3000
          });
          setTimeout((): void => {this._router.navigate(['/']); }, 1000);
        }
      }
    }
  }
  loginCustomer(auth: Client): Promise<any> {
    return new Promise((resolve, reject) => {
      this._auth.login(auth).subscribe(
        (customer: PartialObserver<any> | any): void => {
          if (customer.status) {
            resolve({
              status: true,
              token: customer.token,
              client: customer.data
            });
            return;
          } else {
            resolve({
              status: false,
            });
            return;
          }
        }
      );
    });
  }
  loginVehicle(_keyCustomer: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._auth.loginVehicle(_keyCustomer).subscribe(
        (Vehicle: PartialObserver<any> | any): void => {
          if (Vehicle.status) {
            resolve({
              status: true,
              vehicle: Vehicle.Models
            });
            return;
          } else {
            resolve({
              status: false,
            });
            return;
          }
        }
      );
    });
  }
}
