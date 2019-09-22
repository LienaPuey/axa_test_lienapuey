import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router} from '@angular/router';
import { AuthService } from './services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  canActivate(){
    if (this._guard.isLogged()){
      this._router.navigateByUrl('/login');
      return true;
    }else{
      return false;
    }
  }
  constructor (private _guard: AuthService, private _router : Router){}
}
