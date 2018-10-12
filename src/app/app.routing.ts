import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/pages/main.component';
import { NotFoundComponent } from './components/pages/public/not-found/not-found.component';
import { LoginComponent } from './components/pages/public/login/login.component';

const routes: Routes = [
     {
         path: '',
         component: MainComponent,
         loadChildren: './components/pages/pages.module#PagesModule'
     },
     {path: '**', component: NotFoundComponent},
     {path: 'login', component: LoginComponent}
];

export const APP_ROUTES = RouterModule.forRoot(routes, {useHash: false});

