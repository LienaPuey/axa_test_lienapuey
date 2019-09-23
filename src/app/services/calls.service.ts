import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CallsService {

  //LOGIN FUNCTIONS


  body: Object = {};
  apiResult;



  sendData(Uemail) {
    this.body = { email: Uemail }
    return this._http.post('http://localhost:3000/login', this.body);
  }

  //USER FUNCTIONS
  httpOptions: any;
  token: string;
  username: string;
  data: any;
  user: any;

  //Authorization
  setAuthHeader() {
    this.token = localStorage.getItem('user') || localStorage.getItem('admin');

    return this.httpOptions = { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` }) }
  };



  //Search Data by username
  searchUsername(name) {
    return this._http.get(`http://localhost:3000/api/username/${name}`, this.setAuthHeader())
  }

  //
  searchId(userId) {
    return this._http.get(`http://localhost:3000/api/userId/${userId}`, this.setAuthHeader())
  }

  searchPolicyName(uPolicies){
    return this._http.get(`http://localhost:3000/api/admin/policies/${uPolicies}`, this.setAuthHeader())
  }

searchPolicyId(uPolicyId){
  return this._http.get(`http://localhost:3000/api/admin/users/${uPolicyId}`, this.setAuthHeader())
}

  constructor(private _router: Router, private _http: HttpClient) { }
}
