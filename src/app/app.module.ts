import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule} from "@angular/router";
import { ROUTES } from "./app.routes";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RacesComponent } from './races/races.component';
import { RaceComponent } from './race/race.component';
import { PonyComponent } from './pony/pony.component';
import { FromNowPipe } from './from-now.pipe';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './jwt.interceptor';


@NgModule({
  declarations: [AppComponent, MenuComponent, RacesComponent, RaceComponent, PonyComponent, FromNowPipe, HomeComponent, RegisterComponent, LoginComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(ROUTES), ReactiveFormsModule, FormsModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useExisting: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
