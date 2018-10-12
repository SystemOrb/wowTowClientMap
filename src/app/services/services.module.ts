import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteService } from './maps/autocomplete.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AutocompleteService
  ],
  declarations: []
})
export class ServicesModule { }
