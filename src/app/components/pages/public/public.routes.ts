import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { NotAfiliatedComponent } from './not-afiliated/not-afiliated.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {path: 'new/afiliated', component: NotAfiliatedComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicRoutingModule {}
