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
import { FormsModule } from '@angular/forms';
import { AgmDirectionModule } from 'agm-direction';
import { TaxDialogComponent } from './map/tax-dialog.component';
import { AngularMaterialModule } from '../../angular-material.module';
import { DecimalPipe } from '../../services/pipes/decimal.pipe';
import { ServiceStatusPipe } from '../../services/pipes/service-status.pipe';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ServiceComponent } from './map/service.component';
const config: SocketIoConfig = {
  url: 'http://localhost:8080',
  options: {'query': 'session=' + localStorage.getItem('_id') + '&authType=appCustomer'}
};
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB5p34zzFGSWmuv7m6Wfh8WpvY-ZJmdEfA',
      libraries: ['places', 'geometry']
    }),
    AgmDirectionModule,
    FormsModule,
    AngularMaterialModule,
    SocketIoModule.forRoot(config)
  ],
  declarations: [
    HistoryComponent,
    MapComponent,
    TaxDialogComponent,
    NotificationComponent,
    SupportComponent,
    ProfileComponent,
    DecimalPipe,
    ServiceStatusPipe,
    ServiceComponent
  ],
  entryComponents: [
    TaxDialogComponent,
    MapComponent,
    ServiceComponent
  ]
})
export class PagesModule { }
