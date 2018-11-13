// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Third party
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChartsModule } from 'ng2-charts';

// Pipes

// Components
import { AppComponent } from './app.component';
import { HoardingBookingComponent } from './components/hoarding-booking/hoarding-booking.component';
import { LocationComponent } from './components/location/location.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { BookingComponent } from './components/booking/booking.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HistoryComponent } from './components/history/history.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PopularChartComponent } from './components/popular-chart/popular-chart.component';
import { RevenueChartComponent } from './components/revenue-chart/revenue-chart.component';
import { MonthlyRevenueChartComponent } from './components/monthly-revenue-chart/monthly-revenue-chart.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { OrdersComponent } from './components/orders/orders.component';
import { LocationsComponent } from './components/locations/locations.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { OrderComponent } from './components/order/order.component';
import { MapComponent } from './components/map/map.component';
import { ApplicationComponent } from './components/application/application.component';

@NgModule({
  declarations: [
    AppComponent,
    HoardingBookingComponent,
    LocationComponent,
    CalendarComponent,
    BookingComponent,
    LoginComponent,
    RegisterComponent,
    HistoryComponent,
    FooterComponent,
    TopbarComponent,
    ImageCarouselComponent,
    DashboardComponent,
    SpinnerComponent,
    PopularChartComponent,
    RevenueChartComponent,
    MonthlyRevenueChartComponent,
    BookingsComponent,
    AnalyticsComponent,
    OrdersComponent,
    LocationsComponent,
    UserComponent,
    UsersComponent,
    OrderComponent,
    MapComponent,
    ApplicationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    LeafletModule.forRoot(),
    NgxSpinnerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
