import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { FlightSelectComponent } from './components/flight-select/flight-select.component';
import { TimeTransformPipe } from './pipes/time-transform.pipe';
import { RegisterComponent } from './components/register/register.component';
import { AddflightComponent } from './components/addflight/addflight.component';
import { DeleteflightComponent } from './components/deleteflight/deleteflight.component';
import { AdminviewComponent } from './components/adminview/adminview.component';
import { PassengerdetailsComponent } from './components/passengerdetails/passengerdetails.component';
import { SeatselectComponent } from './components/seatselect/seatselect.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { UserviewComponent } from './components/userview/userview.component';
import { PaymentgatewayComponent } from './components/paymentgateway/paymentgateway.component';
import { ShowticketComponent } from './components/showticket/showticket.component';
import { MatNativeDateModule } from '@angular/material/core';
import { OrderModule } from 'ngx-order-pipe';
import { SearchPipe } from './pipes/search.pipe';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
// import { HttpErrorInterceptor } from './http-error.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AdminloginComponent,
    UserloginComponent,
    FlightSelectComponent,
    TimeTransformPipe,
    RegisterComponent,
    AddflightComponent,
    DeleteflightComponent,
    AdminviewComponent,
    PassengerdetailsComponent,
    SeatselectComponent,
    ResetpasswordComponent,
    UserviewComponent,
    PaymentgatewayComponent,
    ShowticketComponent,
    SearchPipe,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    OrderModule,
  ],
  providers:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
