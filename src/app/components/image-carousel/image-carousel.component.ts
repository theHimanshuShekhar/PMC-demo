import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css']
})
export class ImageCarouselComponent implements OnInit {

  images = [null, null, null];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getImage().subscribe(url => {
      this.images.forEach((el, i) => {
        this.images[i] = url;
      });
    });
  }

}
