import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  isLogged() {
    if (localStorage.getItem('user') !== null || localStorage.getItem('admin') !== null  )
      return true;
    
  }
  constructor() { }
}
