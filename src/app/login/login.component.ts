import { Component } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'pr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    login: '',
    password: ''
  };
  authenticationFailed : boolean = false;

  constructor(private userService : UserService, private router : Router) {
  }


  authenticate() : void {
    this.authenticationFailed = false;
    this.userService
      .authenticate(this.credentials)
      .subscribe(
        () =>this.router.navigate(['/']),
        () => (this.authenticationFailed = true)
      )
  }


}
