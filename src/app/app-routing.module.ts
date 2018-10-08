import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HoardingBookingComponent } from './components/hoarding-booking/hoarding-booking.component';
import { LocationComponent } from './components/location/location.component';

const routes: Routes = [
  {
    path: '',
    component: HoardingBookingComponent
  },
  {
    path: 'location/:id',
    component: LocationComponent
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }