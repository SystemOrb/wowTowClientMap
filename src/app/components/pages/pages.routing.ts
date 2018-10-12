import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MapComponent } from './map/map.component';
import { HistoryComponent } from './history/history.component';
import { NotificationComponent } from './notification/notification.component';
import { SupportComponent } from './support/support.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
    {path: 'home', component: MapComponent},
    {path: 'history', component: HistoryComponent},
    {path: 'notification', component: NotificationComponent},
    {path: 'support', component: SupportComponent},
    {path: 'profile', component: ProfileComponent},
    { path: '', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
