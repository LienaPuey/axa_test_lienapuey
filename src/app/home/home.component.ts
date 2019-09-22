import { Component, OnInit } from '@angular/core';
import { CallsService } from '../services/calls.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  
  failed = false;
  failed2 = false;
  failed3 = false;
  failed4 = false;
  

  CheckToken() {
    this._calls.checkToken();
  }

  SetAuthHeader() {
    this._calls.setAuthHeader();
  };

  SearchUsername() {
   this._calls.searchUsername();
  }

  SearchId() {
   this._calls.searchId();
    
  }

  SearchPolicyName() {
    this._calls.searchPolicyName();
  }

  SearchPolicyId() {
    this._calls.searchPolicyId();
    
  }

  Reset() {
    this._calls.reset();
  }
  constructor(private _calls: CallsService) { }

  ngOnInit() {

    this.CheckToken();
  }
}
