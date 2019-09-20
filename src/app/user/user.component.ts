import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userId: string;
  username: string;
  data: any;
  searchUsername(){////////CONTINUA POR AQUI, FALTA METER EL TOKEN
    
    if (this.username == "undefined"){
      return;
    }else{
      this._http.get(`http://localhost:3000/api/userName/${this.username}`).subscribe(userData =>{ 
        this.data = userData;  
      if (this.data.message == "Ok"){
          console.log(this.data);
          
        }
      });
    }
  }
  searchId(){}

  constructor(private _http:  HttpClient) { }

  ngOnInit() {
  }

}
