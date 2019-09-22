import { Component, OnInit } from '@angular/core';
import { CallsService } from '../services/calls.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //Var DOM manipulation
  failed = false;
  mail: string = "";

  SendData() {
    if (this.mail == undefined) {
      this.failed = true;
      return;
    }
    if (this.mail.length == 0) {
      this.failed = true;
      return;
    }
    this._calls.sendData(this.mail);
    setTimeout(() => {
      if (localStorage.getItem('user')) {
        this._router.navigateByUrl('/user');
      } else if (localStorage.getItem('admin')) {
        this._router.navigateByUrl('/admin');
      }

    }, 500);


  };

  reset() {
    this.failed = false;
    return;
  }

  constructor(private _calls: CallsService, private _router: Router) { }


  ngOnInit() {
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
  }

}
