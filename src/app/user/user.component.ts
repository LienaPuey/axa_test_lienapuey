import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userId: string;
  username: string;
  data: any;
  httpOptions: any;
  token: string;

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

  constructor(private _http: HttpClient, private _router: Router) { }

  ngOnInit() {

    this.checkToken();
  }

}
