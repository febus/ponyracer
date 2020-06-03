import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loginCtrl : FormControl;
  passwordCtrl : FormControl;
  birthYearCtrl : FormControl;
  confirmPasswordCtrl : FormControl;
  userForm: FormGroup;
  passwordForm: FormGroup;
  registrationFailed : boolean;

  static passwordMatch (group : FormGroup)  {
    const password = group.get('password').value;
    const confirm = group.get('confirmPassword').value;
    return password === confirm ? null : { matchingError : true };
  }

  constructor( fb : FormBuilder, private userService : UserService, private router : Router) {
    const currentDate = new Date().getFullYear()
    this.loginCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
    this.passwordCtrl = fb.control('', [Validators.required]);
    this.birthYearCtrl = fb.control('', [Validators.required, Validators.min(1900), Validators.max(currentDate)]);
    this.confirmPasswordCtrl = fb.control('', [Validators.required]);

    this.passwordForm = fb.group(
      { password: this.passwordCtrl, confirmPassword: this.confirmPasswordCtrl },
      { validators : RegisterComponent.passwordMatch }
    );

    this.userForm = fb.group({
      login: this.loginCtrl,
      passwordForm : this.passwordForm,
      birthYear: this.birthYearCtrl
    });
  }

  register() : void {
    this.userService
      .register(this.userForm.value.login, this.userForm.value.passwordForm.password, this.userForm.value.birthYear)
      .subscribe(
        () =>this.router.navigate(['/']),
        () => (this.registrationFailed = true)
    );
  }
}
