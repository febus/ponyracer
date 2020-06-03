import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {UserModel} from "../models/user.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  navbarCollapsed: boolean = true;

  user : UserModel;
  userEventsSubscription: Subscription;

  constructor(private userService : UserService) {
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

  logout() : void {
    this.userService.logout();
  }





}
