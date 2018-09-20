// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


// Third party
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

// Components
import { AppComponent } from './app.component';
import { HoardingBookingComponent } from './components/hoarding-booking/hoarding-booking.component';

@NgModule({
  declarations: [
    AppComponent,
    HoardingBookingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LeafletModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
