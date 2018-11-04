import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Tax } from 'src/app/models/map/tax.class';
import { CalculatorService } from '../../../services/maps/calculator.service';
import { AuthService } from '../../../services/customer/auth.service';
import { ENVIROMENT_LOCAL } from 'src/app/Routes/routes';
import { NgForm } from '@angular/forms';
declare function stripeObject();
@Component({
  selector: 'app-tax-dialog',
  templateUrl: './tax-dialog.component.html',
  styleUrls: ['./tax-dialog.component.css']
})
export class TaxDialogComponent implements OnInit, OnDestroy  {
  constructor(public dialogRef: MatDialogRef<TaxDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tax, private tax: CalculatorService,
    public customer: AuthService) { }
    public ENVIROMENT = ENVIROMENT_LOCAL;
    public formData: NgForm;
    onNoClick(): void {
      this.tax.displayPopTax = true;
      this.dialogRef.close();
    }
    ngOnInit(): void {
      stripeObject();
    }
    ngOnDestroy(): void {
      this.tax.displayPopTax = true;
    }
    saveLocalStorage(dataTemporal: NgForm) {
      console.log(dataTemporal);
    }
    test() {
      alert('hola mundo');
    }
}
