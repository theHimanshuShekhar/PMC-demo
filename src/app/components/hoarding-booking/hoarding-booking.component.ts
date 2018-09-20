import { Component, OnInit } from '@angular/core';
import { latLng, marker, tileLayer, latLngBounds, icon, LatLngExpression, Point } from 'leaflet';
import {trigger, transition, style, animate, state} from '@angular/animations';

@Component({
  selector: 'app-hoarding-booking',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateX(50%)', opacity: 0}),
          animate('200ms', style({ transform: 'translateX(0%)', opacity: 1}))
        ])
      ]
    )
  ],
  templateUrl: './hoarding-booking.component.html',
  styleUrls: ['./hoarding-booking.component.css']
})
export class HoardingBookingComponent implements OnInit {
  selected;
  locations = [
    {
      name: 'marker location 1',
      coords: [ 18.9894, 73.1175 ]
    },
    {
      name: 'marker location 2',
      coords  : [ 18.9794, 73.1275 ]
    },
    {
      name: 'marker location 3',
      coords  : [ 18.9994, 73.1375 ]
    },
  ];

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
  ngOnInit() {
    this.setMarkers();
    this.showInfo = false;
  }

  setMarkers() {
    const self = this;
    for (let i = 0; i < this.locations.length; i++) {
      this.markers.push(marker(this.getCoords(this.locations[i].coords), {
        riseOnHover: true,
        riseOffset: 250,
        icon: icon({
            iconSize: [ 25, 41 ],
            iconAnchor: [ 13, 41 ],
            iconUrl: 'assets/marker-icon.png',
            shadowUrl: 'assets/marker-shadow.png'
        })
      }).bindPopup(this.locations[i].name, {offset: new Point(0, -20)})
      .on('click', this.handleEvent.bind(self))
      );
    }
  }

  getCoords(coords): LatLngExpression {
    return coords;
  }

  handleEvent() {
    console.log('handle marker click event');
    this.toggleShowInfo();
  }

  clickBooking() {
    alert('Open Booking modal or redirect to booking/payment page');
  }

  toggleShowInfo(location?) {
    if (location) {
      this.selected = location.name;
    }
    this.showInfo = !this.showInfo;
  }

  addMarker(input) {
    if (input.name && input.lat && input.long) {
      this.locations.push({
        name: input.name,
        coords: [input.lat, input.long]
      });
      this.setMarkers();
    } else {
      alert('fill all fields');
    }
  }
}
