import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AuthGuardGuard } from './auth-guard.guard';

//ROUTES
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '**', component: LoginComponent },//Redirects to the login page when writing something in the url
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: HomeComponent, canActivate: [AuthGuardGuard] },//Admin component "home"
  { path: 'user', component: UserComponent, canActivate: [AuthGuardGuard] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
