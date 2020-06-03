import { Component, OnInit } from '@angular/core';
import {RaceService} from "../race.service";

@Component({
  selector: 'pr-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {
  races : Array<any>;
  constructor(private raceService : RaceService) { }

  ngOnInit(): void {
    this.raceService.list().subscribe(races => this.races = races);
  }

}
