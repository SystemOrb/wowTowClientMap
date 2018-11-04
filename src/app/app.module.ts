import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StaticModule } from './components/static/static.module';
import { NotFoundComponent } from './components/pages/public/not-found/not-found.component';
import { APP_ROUTES } from './app.routing';
import { RouterModule } from '@angular/router';
import { MainComponent } from './components/pages/main.component';
import { ServicesModule } from './services/services.module';
import { HttpClientModule } from '@angular/common/http';
import { PublicComponent } from './components/pages/public/public.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MainComponent,
    PublicComponent
  ],
  imports: [
    BrowserAnimationsModule,
    StaticModule,
    APP_ROUTES,
    RouterModule,
    ServicesModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
