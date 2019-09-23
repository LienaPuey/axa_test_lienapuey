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
  user;//input
  userexists = false;
  callback;
  failed = false;
  failed2 = false;

  SearchUsername() {
    if (this.username == undefined || this.username.length == 0) {
      return;
    }
    this._calls.searchUsername(this.username)
      .subscribe(res => {
        if (res['message'] !== "Ok") {
          this.failed = true;
        } else {
          this.callback = res;
          this.userexists = true;
        }
      });
  }


  SearchId() {
    if (this.userId == undefined || this.userId.length == 0) {
      return;
    }

    this._calls.searchId(this.userId)
      .subscribe(res => {

        if (res['message'] !== "Ok") {
          this.failed2 = true;
        } else {
          this.callback = res;
          this.userexists = true;
        }
      });
  }



  reset() {
    this.failed = false;
    this.failed2 = false;
  }

  constructor(private _calls: CallsService) { }

  ngOnInit() {

  }

}
