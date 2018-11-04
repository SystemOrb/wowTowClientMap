import { Injectable } from '@angular/core';
import { Tax } from '../../models/map/tax.class';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  displayPopTax: boolean = true;
  public AutomobileHook: Tax = null;
  public AutomobileFlat: Tax = null;
  public MediumTruck: Tax = null;
  public HeavyTruck: Tax = null;
  constructor() { }
}
