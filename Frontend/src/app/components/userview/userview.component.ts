import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {BookingserviceService} from '../../services/bookingservice.service'


@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {
  bookings : any; 
 
    myDate = new Date();
  constructor(private bookingdetail :BookingserviceService,private http : HttpClient, private route: Router) {}
    
  todayShort:Date = new Date(moment(Date.now()).format("YYYY:MM:DD"));

  ngOnInit(): void {
    this.bookingdetail.bookingDetails().subscribe(data=>{this.bookings=data;console.log(this.bookings)},(error)=>{
      alert("Failed to fetch data from server.");
    }); 
    console.log( new Date().getHours());
    console.log( new Date().getMinutes());
    console.log(this.todayShort);
  }
  tickets:any;  //to store subscribed values
  trial:any;  //to store booking id of a user
  check: boolean =false;  //to put condition to display details
 status:any="confirmed";
 booktable:any;
  details(id,booking)
  {
     this.trial=id;
     this.booktable=booking;
     this.bookingdetail.ticketDetails(id).subscribe(data=>{this.tickets=data;
    },(error)=>{
      alert("Failed to fetch data from server.");
    })
      this.check=!this.check;     
      
  }
  tickter:any;

  idpass(tickets){
    this.tickter=tickets;
    console.log(this.tickter);
  }
  canCancel(ticket)
  {
    let hours=0;
    let presentHours=new Date().getHours();
    let presentMinutes=new Date().getMinutes();
    console.log(presentMinutes)
    console.log(presentHours);
    console.log(+ticket.DepartTime.substr(0,2));
     hours=+ticket.DepartTime.substr(0,2)-presentHours;
    console.log(hours);
    hours=hours+(+ticket.DepartTime.substr(3,2)-(presentMinutes)%60);
    console.log(+ticket.DepartTime.substr(3,2));
    console.log(hours);
    console.log(ticket.DateTravel>this.todayShort);
    let d= new Date(moment(ticket.DateTravel).format("YYYY:MM:DD"));
    if(d>this.todayShort&&ticket.DateCancellation==null)
    {
      
      console.log(this.todayShort)
      console.log(ticket.DateCancellation)
      return true;
    }
    else if(hours>3)
    {
      console.log('hello');
      return true;
      
    }
    else{
      console.log(false)
    return false;
    }
  }
  ondelete(ticket){
    ticket.DateCancellation=this.myDate;
    this.bookingdetail.deleteticket(ticket).subscribe(data=>{
      console.log(data)});
     this.booktable.TotalPassenger-=1;
      this.bookingdetail.updatebooking(this.booktable).subscribe(data=>{});
      alert("Your ticket has been cancelled and a refund has been generated!!")

    
  }
  
}
