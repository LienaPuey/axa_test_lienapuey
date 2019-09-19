import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CallsService} from './services/calls.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ 
    CallsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
