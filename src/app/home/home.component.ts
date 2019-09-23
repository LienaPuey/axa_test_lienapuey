import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CallsService } from '../services/calls.service';

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
  policyId: string;
  policyName: string;
  failed = false;
  failed2 = false;
  failed3 = false;
  failed4 = false;
  user;
  userexists = false;
  array;


  SearchUsername() {//Returns an object
    if (this.username == undefined || this.username.length == 0)
      return;
    this._calls.searchUsername(this.username)
      .subscribe(userData => {
        this.data = userData;
        if (this.data.message == "Ok") {
          this.user = this.data;
          this.userexists = true;

        } else {
          this.failed = true;

        }
      });
  }

  SearchId() {//Returns an object
    if (this.userId == undefined || this.userId.length == 0) return;
    this._calls.searchId(this.userId)
      .subscribe(userData => {
        this.data = userData;
        if (this.data.message == "Ok") {
          this.user = this.data;
          this.userexists = true;
        } else {
          this.failed2 = true;
        }

      });

  }

  SearchPolicyName() {//Returns an array
    if (this.policyName == undefined || this.policyName.length == 0)
      return;
    this._calls.searchPolicyName(this.policyName)
      .subscribe(userData => {

        if (userData['message'] == undefined) {

          this.array = userData;

        } else {
          this.failed3 = true;

        }
      });
  }


  SearchPolicyId() {//Returns an object
    if (this.policyId == undefined || this.policyId.length == 0)
      return;

    this._calls.searchPolicyId(this.policyId)
      .subscribe(userData => {

        if (userData['message'] == "Ok") {
          this.user = userData;
          this.userexists = true;

        } else {
          this.failed4 = true;
        }
      });
  }


  reset() {
    this.failed = false;
    this.failed2 = false;
    this.failed3 = false;
    this.failed4 = false;
  }


  constructor(private _http: HttpClient, private _router: Router, private _calls: CallsService) { }

  ngOnInit() {


  }
}
