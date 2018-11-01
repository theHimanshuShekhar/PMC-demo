import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HoardingBookingComponent } from './components/hoarding-booking/hoarding-booking.component';
import { LocationComponent } from './components/location/location.component';
import { BookingComponent } from './components/booking/booking.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HistoryComponent } from './components/history/history.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { UserComponent } from './components/user/user.component';

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
    path: 'book',
    component: BookingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'orders',
    component: BookingsComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'account',
    component: UserComponent
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