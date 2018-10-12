import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history/history.component';
import { MapComponent } from './map/map.component';
import { NotificationComponent } from './notification/notification.component';
import { SupportComponent } from './support/support.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PagesRoutingModule } from './pages.routing';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB5p34zzFGSWmuv7m6Wfh8WpvY-ZJmdEfA',
      libraries: ['places']
    }),
    FormsModule
  ],
  declarations: [
    HistoryComponent,
    MapComponent,
    NotificationComponent,
    SupportComponent,
    ProfileComponent
  ]
})
export class PagesModule { }
