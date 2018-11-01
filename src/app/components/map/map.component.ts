import { Component, OnInit, Input } from '@angular/core';
import { latLng, marker, tileLayer, latLngBounds, icon, LatLngExpression, Point, polygon } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() location;

  options;
  marker;

  constructor() { }

  ngOnInit() {
    if (this.location) {
      this.options = {
        layers: [
          tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' })
        ],
        maxBounds: latLngBounds(latLng(this.location.latlong._lat, this.location.latlong._long), latLng(this.location.latlong._lat, this.location.latlong._long)),
        minZoom: 13,
        zoom: 13,
        dragging: false,
        center: latLng(this.location.latlong._lat, this.location.latlong._long)
      };
      this.marker = marker(this.getCoords(this.location.latlong), {
        title: this.location.name,
        riseOnHover: true,
        riseOffset: 250,
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      })
        .bindPopup(this.location.name, { offset: new Point(0, -20) })
        .on('mouseover', this.mouseover)
        .on('mouseout', this.mouseout)
    }
  }

  mouseout() {
    // @ts-ignore
    this.closePopup();
  }
  mouseover() {
    // @ts-ignore
    this.openPopup();
  }

  getCoords(coords): LatLngExpression {
    return [coords._lat, coords._long];
  }



}
