import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteService } from './maps/autocomplete.service';
import { CalculatorService } from './maps/calculator.service';
import { NotAfiliatedService } from './customer/not-afiliated.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './customer/auth.service';
import { AngularMaterialModule } from '../angular-material.module';
import { GraphicalsOrdersService } from './maps/graphicals-orders.service';
import { AuthGuard } from './guards/auth.guard';
import { ProviderProfileService } from './providers/provider-profile.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AngularMaterialModule
  ],
  providers: [
    AutocompleteService,
    CalculatorService,
    NotAfiliatedService,
    AuthService,
    GraphicalsOrdersService,
    AuthGuard,
    ProviderProfileService
  ],
  declarations: [],
  exports: []
})
export class ServicesModule { }
