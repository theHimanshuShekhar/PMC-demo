import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoardingBookingComponent } from './hoarding-booking.component';

describe('HoardingBookingComponent', () => {
  let component: HoardingBookingComponent;
  let fixture: ComponentFixture<HoardingBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoardingBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoardingBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
