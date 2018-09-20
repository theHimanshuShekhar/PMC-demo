import { Component, OnInit } from '@angular/core';
import { latLng, marker, tileLayer, latLngBounds, icon, LatLngBoundsExpression, Point } from 'leaflet';

@Component({
  selector: 'app-hoarding-booking',
  templateUrl: './hoarding-booking.component.html',
  styleUrls: ['./hoarding-booking.component.css']
})
export class HoardingBookingComponent implements OnInit {
  locations: LatLngBoundsExpression = [
    [ 18.9894, 73.1175 ],
    [ 18.9794, 73.1275 ],
    [ 18.9994, 73.1275 ]
  ];

  markers = [];

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' })
      // tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    maxBounds: latLngBounds(latLng(18.8894, 73.1075), latLng(19.0894, 73.1475)),
    zoom: 13,
    center: latLng(18.9894, 73.1175)
  };
  handleMarkerClick(event) {
    console.log(event);
  }

  ngOnInit() {
    this.setMarkers();
  }

  setMarkers() {
    for (let i = 0; i < this.locations.length; i++) {
      this.markers.push(marker(this.locations[i], {
        riseOnHover: true,
        riseOffset: 250,
        icon: icon({
            iconSize: [ 25, 41 ],
            iconAnchor: [ 13, 41 ],
            iconUrl: 'assets/marker-icon.png',
            shadowUrl: 'assets/marker-shadow.png'
        })
      }).bindPopup('marker', {offset: new Point(0, -20)})
      .on('click', this.handleEvent)
      );
    }
  }

  handleEvent(e) {
    console.log('clicked on marker at: ', e.latlng);
  }
}
