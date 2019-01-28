import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../customer/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userLogged: AuthService, private _router: Router) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userLogged.logged()) {
      console.log('logged');
      return true;
    } else {
     this._router.navigate(['/public/login']);
     return false;
    }
  }
}
