import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularChartComponent } from './popular-chart.component';

describe('PopularChartComponent', () => {
  let component: PopularChartComponent;
  let fixture: ComponentFixture<PopularChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
