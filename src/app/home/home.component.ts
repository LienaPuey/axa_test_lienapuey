import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  userId: string;
  username: string;
  data: any;
  httpOptions: any;
  token: string;
  policyId:string;
  policyName:string;

  checkToken(){
    if(localStorage.getItem('user') == null){
     return false
    }else{
      this.token= localStorage.getItem('user')
      return true
    }
  }
  setAuthHeader() {
    return this.httpOptions = { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` }) }
  };
  searchUsername() {
    if (this.username == "undefined") {
      return;
    } else {
      this._http.get(`http://localhost:3000/api/userName/${this.username}`, this.setAuthHeader()).subscribe(userData => {
        this.data = userData;
        if (this.data.message == "Ok") {
          console.log(this.data);

        } else {
          console.log(this.data.message);
        }
      });
    }
  }
  searchId() {
    if (this.userId == "undefined") {
      return;
    } else {
      this._http.get(`http://localhost:3000/api/userId/${this.userId}`, this.setAuthHeader()).subscribe(userData => {
        this.data = userData;
        if (this.data.message == "Ok") {
          console.log(this.data);

        } else {
          console.log(this.data.message);
        }
      });
    }
  }

  searchPolicyId(){
    if (this.policyId == "undefined") {
      return;
    } else {
      this._http.get(`http://localhost:3000/api/admin/policies/${this.policyId}`, this.setAuthHeader()).subscribe(userData => {
        this.data = userData;
        if (this.data.message == "Ok") {
          console.log(this.data);

        } else {
          console.log(this.data.message);
        }
      });
    }
  }

  searchPolicyName(){
    if (this.policyName == "undefined") {
      return;
    } else {
      this._http.get(`http://localhost:3000/api/admin/users/${this.policyName}`, this.setAuthHeader()).subscribe(userData => {
        this.data = userData;
        if (this.data.message == "Ok") {
          console.log(this.data);

        } else {
          console.log(this.data.message);
        }
      });
    }
  }

  constructor(private _http: HttpClient, private _router: Router) { }

  ngOnInit() {

    this.checkToken();
  }
}
