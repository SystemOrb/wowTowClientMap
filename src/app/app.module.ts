import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StaticModule } from './components/static/static.module';
import { NotFoundComponent } from './components/pages/public/not-found/not-found.component';
import { LoginComponent } from './components/pages/public/login/login.component';
import { APP_ROUTES } from './app.routing';
import { RouterModule } from '@angular/router';
import { MainComponent } from './components/pages/main.component';
import { ServicesModule } from './services/services.module';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    StaticModule,
    APP_ROUTES,
    RouterModule,
    ServicesModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
