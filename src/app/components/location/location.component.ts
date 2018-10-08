import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  @Input() location;
  @Output() toggleInfo = new EventEmitter<string>();
  fullview = false;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.location) {
      this.fullview = true;
      this.route.params.subscribe(routeurl => {
        this.dataService.getLocation(routeurl.id).subscribe(location => this.location = location);
      });
    }
  }

  clickBooking() {
    this.router.navigateByUrl('/location/' + this.location.id);
  }

  toggleShowInfo() {
    this.toggleInfo.emit();
  }

}
