import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { latLng, marker, tileLayer, latLngBounds, icon, LatLngExpression, Point, polygon } from 'leaflet';
import { trigger, transition, style, animate } from '@angular/animations';
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
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),
      polygon([
        [19.041976, 73.114564],
        [19.046834, 73.108463],
        [19.047251, 73.100408],
        [19.044275, 73.093880],
        [19.039339, 73.088746],
        [19.032661, 73.085348],
        [19.026971, 73.093305],
        [19.026373, 73.087310],
        [19.026373, 73.087310],
        [19.017485, 73.086497],
        [19.014198, 73.083185],
        [19.009182, 73.087918],
        [19.006005, 73.100335],
        [18.996672, 73.098146],
        [18.992247, 73.094606],
        [18.985185, 73.099939],
        [18.975629, 73.111494],
        [18.967344, 73.116268],
        [18.958723, 73.115783],
        [18.940720, 73.099276],
        [18.930804, 73.133545],
        [18.932078, 73.145751],
        [18.950928, 73.145772],
        [18.967793, 73.144199],
        [18.974786, 73.145795],
        [18.978613, 73.134022],
        [18.985964, 73.126938],
        [18.987936, 73.133037],
        [18.990695, 73.138248],
        [18.996822, 73.141672],
        [18.998666, 73.142392],
        [18.999840, 73.142095],
        [19.001202, 73.140869],
        [19.001527, 73.139244],
        [19.001213, 73.137362],
        [19.000566, 73.132627],
        [19.000215, 73.130595],
        [19.005525, 73.127149],
        [19.014495, 73.116102],
      ])
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
