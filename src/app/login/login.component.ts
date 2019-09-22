import { Component, OnInit } from '@angular/core';
import { CallsService } from '../services/calls.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  failed = false;
  mail: string = "";

  SendData() {

    this._calls.sendData(this.mail) ? this.failed = true : this.failed = true;//Revisar
  };


  constructor(private _calls: CallsService) { }


  ngOnInit() {
  }

}
