import { Injectable } from '@angular/core';
import { LoginComponent } from '../component/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoggedIn(){
   if( localStorage.getItem("isUserLoggedIn") === 'true'){
    return true;
   }else{
    return false;
   }
  }
}
