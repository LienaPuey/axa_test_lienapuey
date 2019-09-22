import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AuthGuardGuard } from './auth-guard.guard';

//ROUTES
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuardGuard] },
  { path: 'admin', component: HomeComponent, canActivate: [AuthGuardGuard] },
  { path: '**', component: LoginComponent }//Redirects to the login page when writing something in the url
  
 
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
