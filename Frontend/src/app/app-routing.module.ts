import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{ AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { FlightSelectComponent } from './components/flight-select/flight-select.component';
import { HomeComponent } from './components/home/home.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { RegisterComponent } from './components/register/register.component';
import { AddflightComponent } from './components/addflight/addflight.component';
import { DeleteflightComponent } from './components/deleteflight/deleteflight.component';
import { AdminviewComponent } from './components/adminview/adminview.component';
import {AuthenticationGuard} from './authGuards/authentication.guard';
import {AuthenticationUserGuard} from './authGuards/authentication-user.guard';
import {UnauthorizedGuard} from './authGuards/unauthorized.guard';
import { PassengerdetailsComponent } from './components/passengerdetails/passengerdetails.component';
import { SeatselectComponent } from './components/seatselect/seatselect.component';
import {ResetpasswordComponent} from './components/resetpassword/resetpassword.component';
import { UserviewComponent } from './components/userview/userview.component';
import { PaymentgatewayComponent } from './components/paymentgateway/paymentgateway.component';
import { ShowticketComponent } from './components/showticket/showticket.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path:"",redirectTo: '/home', pathMatch: 'full'},
  {path:"home",component:HomeComponent},
  {path:"adminlogin",component: AdminloginComponent,canActivate:[UnauthorizedGuard]},
  {path: "userlogin", component: UserloginComponent,canActivate:[UnauthorizedGuard]},
  {path:"flightSelect",component:FlightSelectComponent},
  {path: "register",component: RegisterComponent,canActivate:[UnauthorizedGuard]},
  {path: "addflight",component: AddflightComponent,canActivate:[AuthenticationGuard]},
  {path: "deleteflight",component: DeleteflightComponent,canActivate:[AuthenticationGuard]},
  {path: "adminview", component: AdminviewComponent,canActivate:[AuthenticationGuard]},
  {path: "passengerdetail",component:PassengerdetailsComponent,canActivate:[AuthenticationUserGuard]},
  {path: "seatselect", component: SeatselectComponent,canActivate:[AuthenticationUserGuard]},
  {path: "resetpassword", component: ResetpasswordComponent},
  {path:"userview",component:UserviewComponent,canActivate:[AuthenticationUserGuard]},
  {path: "paymentgateway", component: PaymentgatewayComponent,canActivate:[AuthenticationUserGuard]},
  {path:"showticket",component:ShowticketComponent,canActivate:[AuthenticationUserGuard]},
  { path: '**', component: PagenotfoundComponent }
]




@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
