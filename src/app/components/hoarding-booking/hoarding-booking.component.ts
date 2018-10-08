import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { latLng, marker, tileLayer, latLngBounds, icon, LatLngExpression, Point } from 'leaflet';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-hoarding-booking',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateX(50%)', opacity: 0 }),
          animate('200ms', style({ transform: 'translateX(0%)', opacity: 1 }))
        ])
      ]
    ),
    trigger(
      'popIn', [
        transition(':enter', [
          style({ opacity: 0, transform: 'scale(0.9)' }),
          animate('200ms ease-in', style({ opacity: 1, transform: 'scale(1)' }))
        ])
      ]
    )
  ],
  templateUrl: './hoarding-booking.component.html',
  styleUrls: ['./hoarding-booking.component.css']
})
export class HoardingBookingComponent implements OnInit {
  selected;
  locations;
  markers = [];

  showInfo;

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' })
      // tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    maxBounds: latLngBounds(latLng(18.8894, 73.1075), latLng(19.0894, 73.1475)),
    minZoom: 13,
    zoom: 13,
    center: latLng(18.9894, 73.1175)
  };

  constructor(
    private dataService: DataService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.dataService.getLocations().subscribe(locations => {
      if (locations.length > 0) {
        this.locations = locations;
        this.setMarkers();
      }
    });
    this.showInfo = false;
  }

  setMarkers() {
    this.markers = [];
    this.locations.forEach(hlocation => {
      this.markers.push(marker(this.getCoords(hlocation.latlong), {
        title: hlocation.name,
        riseOnHover: true,
        riseOffset: 250,
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      }).bindPopup(hlocation.name, { offset: new Point(0, -20) })
        .on('mouseover', this.mouseover)
        .on('mouseout', this.mouseout)
        .on('click', this.handleClick.bind(this).bind(hlocation))
      );
    });
  }

  getCoords(coords): LatLngExpression {
    return [coords._lat, coords._long];
  }

  handleClick(markerdata) {
    const name = markerdata.sourceTarget.options.title;
    this.dataService.getLocationByName(name).subscribe(locations => this.toggleShowInfo(locations[0]));
  }
  mouseout() {
    // @ts-ignore
    this.closePopup();
  }
  mouseover() {
    // @ts-ignore
    this.openPopup();
  }

  toggleShowInfo(location?) {
    if (location) {
      this.selected = location;
      this.showInfo = true;
      this.changeDetectorRef.detectChanges();
    } else {
      this.showInfo = false;
    }
  }
}
