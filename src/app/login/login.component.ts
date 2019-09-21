import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mail: string="";
  body:Object = {};
  apiResult;
  failed=false;

  sendData() {
    this.body = { email: this.mail }
    if (this.mail == "undefined") { return };
    this._http.post('http://localhost:3000/login', this.body).subscribe(data => {
      this.apiResult = data;
      if (this.apiResult.message == "ok") {
        switch (this.apiResult.role) {
          case "admin":
            localStorage.setItem('admin', `${ this.apiResult.token }`)
            this._router.navigateByUrl('/admin');
            break;
          case "user":
            localStorage.setItem('user', `${ this.apiResult.token }`)
            this._router.navigateByUrl('/user');
            break;
          default:
            return;
        }
      } else {
        this.failed = true;
        return;
      }
    });
  }

  constructor(private _router: Router, private _http: HttpClient) { }

  ngOnInit() {
  }

}
