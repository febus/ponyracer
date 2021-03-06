import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {UserModel} from "../models/user.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  navbarCollapsed: boolean = true;

  user : UserModel;
  userEventsSubscription: Subscription;

  constructor(private userService : UserService, private router : Router) {
  }

  ngOnInit(): void {
    this.userEventsSubscription = this.userService.userEvents.subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe()
    }
  }

  toggleNavbar(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  logout(event : any) : void {
    event.preventDefault();
    this.userService.logout();
    this.router.navigate(['/']);
  }





}
