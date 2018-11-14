import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { trigger, style, transition, animate } from '@angular/animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  animations: [
    trigger(
      'popIn', [
        transition(':enter', [
          style({ opacity: 0, transform: 'scale(0.9)' }),
          animate('200ms ease-in', style({ opacity: 1, transform: 'scale(1)' }))
        ])
      ]
    )
  ],
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  data = {
    name: null,
    address: null,
    price: null,
    latlong: {
      _lat: null,
      _long: null
    }
  };

  closeResult;
  selected;
  locations;

  constructor(
    private dataService: DataService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getLocations();
  }

  getLocations() {
    this.dataService.getLocations().subscribe(locations => {
      this.locations = locations;
    });
  }

  addLocation() {
    this.dataService.addLocation(this.data).then(() => this.data = {
      name: null,
      address: null,
      price: null,
      latlong: {
        _lat: null,
        _long: null
      }
    });
  }

  openAdd(add) {
    this.modalService.open(add, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content, location) {
    this.selected = location;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  updateLocation() {
    this.dataService.setLocation(this.selected);
  }
}
