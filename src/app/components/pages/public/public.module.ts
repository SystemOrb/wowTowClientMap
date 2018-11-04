import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PublicRoutingModule } from './public.routes';
import { LoginComponent } from './login/login.component';
import { NotAfiliatedComponent } from './not-afiliated/not-afiliated.component';
import { AngularMaterialModule } from '../../../angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PublicRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    LoginComponent,
    NotAfiliatedComponent
  ]
})
export class PublicModule { }
