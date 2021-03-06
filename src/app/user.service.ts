import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {UserModel} from "./models/user.model";
import {tap} from "rxjs/operators";
import {environment} from "../environments/environment";
import { JwtInterceptor } from './jwt.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userEvents = new BehaviorSubject<UserModel>(undefined);
  constructor(private http: HttpClient, private jwtInterceptor: JwtInterceptor) {
  }
  register (login : string, password : string, birthYear : number) : Observable<UserModel> {
    const body = {"login" : login, "password" : password, "birthYear" : birthYear}
    return this.http.post<UserModel>(
      environment.baseUrl + '/api/users',
      body
      );
  }

  authenticate (credentials : {login: string; password: string}) : Observable<UserModel> {
    return this.http
      .post<UserModel>(
        environment.baseUrl + '/api/users/authentication',
        credentials)
      .pipe(tap((user: UserModel) => this.storeLoggedInUser(user)));
  }

  storeLoggedInUser(user : UserModel) {
    window.localStorage.setItem('rememberMe', JSON.stringify(user));
    this.jwtInterceptor.setJwtToken(user.token);
    this.userEvents.next(user);
  }

  retrieveUser(){
    const value  = window.localStorage.getItem('rememberMe');
    if(value) {
      const user = JSON.parse(value);
      this.jwtInterceptor.setJwtToken(user.token);
      this.userEvents.next(user);
    }
  }

  logout(){
    this.userEvents.next(null);
    this.jwtInterceptor.removeJwtToken();
    window.localStorage.removeItem('rememberMe');
  }

}
