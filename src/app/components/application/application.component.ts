import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  @Input() bookid;
  @Output() closeModal = new EventEmitter<string>();

  booking;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  path;

  ngOnInit() {
    this.route.url.subscribe(params => this.path = params[0].path);
    if (this.bookid) {
      this.dataService.getBooking(this.bookid).subscribe(booking => this.booking = booking);
    }
  }

  process(type) {
    switch (type) {
      case 'approve':
        this.dataService.update(this.bookid, { status: 'approved' }).then(() => this.closeModal.emit());
        break;
      case 'reject':
        this.dataService.update(this.bookid, { status: 'rejected' }).then(() => this.closeModal.emit());
        break;
    }
  }

}
