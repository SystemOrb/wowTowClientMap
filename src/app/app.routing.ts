import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/pages/main.component';
import { NotFoundComponent } from './components/pages/public/not-found/not-found.component';
import { PublicComponent } from './components/pages/public/public.component';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
     {
         path: '',
         component: MainComponent,
         canActivate: [AuthGuard],
         loadChildren: './components/pages/pages.module#PagesModule'
     },
     {
         path: 'public',
         component: PublicComponent,
         loadChildren: './components/pages/public/public.module#PublicModule'
     },
     {path: '**', component: NotFoundComponent},
];

export const APP_ROUTES = RouterModule.forRoot(routes, {useHash: false});

