import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
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
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() booking;
  location;
  constructor(
    private dataService: DataService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    if (this.booking) {
      this.getLocation(this.booking.id);
    }
  }

  getLocation(id) {
    this.dataService.getLocation(id).subscribe(location => this.location = location);
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }

}
