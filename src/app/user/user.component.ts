import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CallsService } from '../services/calls.service';

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
  failed=false;
  failed2=false;
  user;
  userexists= false;
  
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
          this.user=this.data;
          this.userexists=true;
          console.log(this.data);

        } else {
          this.failed = true;
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
          this.user=this.data;
          this.userexists=true;
          console.log(this.data);

        } else {
          this.failed2 = true;
          console.log(this.data.message);
        }
      });
    }
  }

  reset() {
    this.failed = false;
    this.failed2 = false;
  }

  constructor(private _http: HttpClient, private _router: Router, private _calls: CallsService) { }

  ngOnInit() {

    this.checkToken();
  }

}
