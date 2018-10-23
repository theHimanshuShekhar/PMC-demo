import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  locations;
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getLocations();
  }

  getLocations() {
    this.dataService.getLocations().subscribe(locations => {
      this.locations = locations;
    });
  }
}
