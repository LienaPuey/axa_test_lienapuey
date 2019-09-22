import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CallsService {

  //LOGIN FUNCTIONS

  email: string = "";
  body: Object = {};
  apiResult;
  failed = false;

  sendData(email) {
    this.body = { email: email }
    if (this.body["email"] == "undefined") { return true; };
    this._http.post('http://localhost:3000/login', this.body).subscribe(data => {
      this.apiResult = data;
      if (this.apiResult.message == "ok") {
        switch (this.apiResult.role) {
          case "admin":
            localStorage.setItem('admin', `${this.apiResult.token}`)
            this._router.navigateByUrl('/admin');
            break;
          case "user":
            localStorage.setItem('user', `${this.apiResult.token}`)
            this._router.navigateByUrl('/user');
            break;
          default:
            return false;
        }
      } else {
        return true;
      }
    });
  }

  //HOME FUNCTIONS 

  userId: string;
  username: string;
  data: any;
  httpOptions: any;
  token: string;
  policyId: string;
  policyName: string;
  failed2 = false;
  failed3 = false;
  failed4 = false;
  user;
  userexists = false;
  array;

  checkToken() {
    if (localStorage.getItem('user') == null) {
      return false;
    } else {
      this.token = localStorage.getItem('user');
      return true;
    }
  }
  setAuthHeader() {
    return this.httpOptions = { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` }) }
  };
  searchUsername() {//Returns an object
    if (this.username == undefined) {
      return;
    } else {
      this._http.get(`http://localhost:3000/api/userName/${this.username}`, this.setAuthHeader()).subscribe(userData => {
        this.data = userData;
        if (this.data.message == "Ok") {
          this.failed = false;
          this.user = this.data;
          this.userexists = true;
          console.log(this.data);

        } else {
          this.failed = true;
          console.log(this.data.message);
        }
      });
    }
  }
  searchId() {//Returns an object
    if (this.userId == undefined) {
      return;
    } else {
      this._http.get(`http://localhost:3000/api/userId/${this.userId}`, this.setAuthHeader()).subscribe(userData => {
        this.data = userData;
        if (this.data.message == "Ok") {
          this.failed2 = false;
          this.user = this.data;
          this.userexists = true;
          console.log(this.data);

        } else {
          this.failed2 = true;
          console.log(this.data.message);
        }
      });
    }
  }

  searchPolicyName() {//Returns an array
    if (this.policyName == undefined) {
      return;
    } else {
      this._http.get(`http://localhost:3000/api/admin/policies/${this.policyName}`, this.setAuthHeader()).subscribe(userData => {
        this.data = userData;
        if (this.data.message == undefined) {
          this.failed3 = false;
          this.array = this.data;
          console.log(this.data);

        } else {
          this.failed3 = true;
          console.log(this.data.message);
        }
      });
    }
  }

  searchPolicyId() {//Returns an object
    if (this.policyId == undefined) {
      return;
    } else {
      this._http.get(`http://localhost:3000/api/admin/users/${this.policyId}`, this.setAuthHeader()).subscribe(userData => {
        this.data = userData;
        if (this.data.message == "Ok") {
          this.failed4 = false;
          this.user = this.data;
          this.userexists = true;
          console.log(this.data);

        } else {
          this.failed4 = true;
          console.log(this.data.message);
        }
      });
    }
  }

  reset() {
    this.failed = false;
    this.failed2 = false;
    this.failed3 = false;
    this.failed4 = false;
  }

  constructor(private _router: Router, private _http: HttpClient) { }
}
