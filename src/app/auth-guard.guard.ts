import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { AuthService } from './services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  canActivate() {

    if (this._guard.isLogged()) {
      
      return true;
    }else{

    return false;

    }
  }
  constructor(private _guard: AuthService ) { 
    
  }
}
