import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;

  isLogged() {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      // this.token = localStorage.getItem('user');
      return false;
    }
  }
  constructor() { }
}
