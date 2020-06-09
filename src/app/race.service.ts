import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RaceModel} from "./models/race.model";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Array<RaceModel>>(environment.baseUrl + '/api/races', { params: { status: 'PENDING' } })
  }

}
