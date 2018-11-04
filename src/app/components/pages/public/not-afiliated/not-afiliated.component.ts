import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { Client } from '../../../../models/customer/customer.class';
import { NotAfiliatedService } from '../../../../services/customer/not-afiliated.service';
import { PartialObserver } from 'rxjs';
import { ClientCar } from '../../../../models/customer/customer.car.class';
import { CustomerAfiliated } from '../../../../models/customer/customer.parent.class';
import { AuthService } from '../../../../services/customer/auth.service';
import { Router } from '@angular/router';
declare function init_plugins();
@Component({
  selector: 'app-not-afiliated',
  templateUrl: './not-afiliated.component.html',
  styleUrls: ['./not-afiliated.component.css']
})
export class NotAfiliatedComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private _afiliated: NotAfiliatedService,
    private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
    init_plugins();
  }
  async afiliatedCustomer(customer: NgForm) {
    if (customer.invalid) {
      this.snackBar.open('Some credentials has been invalid', 'Try again!', {
        duration: 3000
      });
      return;
    }
    // Create a new woowtow customer
    const newClient = new Client(
      customer.value.name,
      customer.value.email,
      customer.value.phone,
      customer.value.password
    );
    const registerCustomer = await this.registerCustomer(newClient);
    if (registerCustomer.status) {
      const newVehicle = new ClientCar(
        registerCustomer.client._id,
        customer.value.car_name,
        customer.value.car_plate
      );
        const vehicle = await this.RegisterVehicle(newVehicle);
        if (vehicle.status) {
          const saveCustomer = new CustomerAfiliated(registerCustomer.client, vehicle.vehicle);
          // Saved this new customer on storage
          if (this._auth.saveStorage(saveCustomer, registerCustomer.token, registerCustomer.client._id)) {
            // tslint:disable-next-line:max-line-length
            this.snackBar.open('Congratulation, Your sign up in Wootow has been successfully. please complete your steps using our map routing',
            null, {
              duration: 3000
            });
            setTimeout((): void => {this._router.navigate(['/home']); }, 4000);
          }
        }
    }
  }
  registerCustomer(clientData: Client): Promise<any> {
    return new Promise((resolve, reject) => {
      this._afiliated.registerClient(clientData).subscribe(
        (wowTowClient: PartialObserver<any> | any): void => {
          if (wowTowClient.status) {
            resolve({
              status: true,
              client: wowTowClient.client,
              token: wowTowClient.token
            });
            return;
          } else {
            resolve({
              status: false
            });
          }
        }
      );
    });
  }
  RegisterVehicle(clientCar: ClientCar): Promise<any> {
    return new Promise((resolve, reject) => {
      this._afiliated.registerClientCar(clientCar).subscribe(
        (customerVehicle: PartialObserver<any> | any): void => {
          if (customerVehicle.status) {
            resolve({
              status: true,
              vehicle: customerVehicle.Models
            });
            return;
          } else {
            resolve({
              status: false
            });
          }
        }
      );
    });
  }
}
