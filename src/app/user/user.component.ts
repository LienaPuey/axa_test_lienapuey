import { Component, OnInit } from '@angular/core';
import { CallsService } from '../services/calls.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userId: string;
  username: string;
  // failed=false;
  // failed2=false;
  user;//input
  userexists = false;
  callback;

  SearchUsername() {
    if (this.username == undefined) {
      return;
    } else if (this.username.length == 0) {
      return;
    } else {
      this.user = this._calls.searchUsername(this.username);
      setTimeout(() => {
        this.callback = this.user.__zone_symbol__value;
        if (this.callback.message == "Ok") {
          this.userexists = true;
        }
      }, 1000);
    }
  }

  SearchId() {
    if (this.userId == undefined) {
      return;
    } else if (this.userId.length == 0) {
      return;
    } else {
      this.user = this._calls.searchUsername(this.userId);
      setTimeout(() => {
        this.callback = this.user.__zone_symbol__value;
        if (this.callback.message == "Ok") {
          this.userexists = true;
        }
      }, 1000);
    }

    this.user = this._calls.searchId(this.userId);

  }

  // reset() {
  //   this.failed = false;
  //   this.failed2 = false;
  // }

  constructor(private _calls: CallsService) { }

  ngOnInit() {

    this._calls.checkToken();

  }

}
