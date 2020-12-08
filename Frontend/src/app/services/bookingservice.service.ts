import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Booking} from 'src/app/models/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingserviceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  
  email :string = sessionStorage.getItem('useremail');
  constructor(private http:HttpClient) { }
  baseUrl : string = "https://localhost:44374/api/booking";
  bookingDetails(){
    let data={id:this.email};
    return this.http.get<any>(this.baseUrl,{params:data});
  }
    ticketDetails(bookid)
    {
      return this.http.get<any>(this.baseUrl+"/tickets/"+bookid);
    }
    deleteticket(ticket){
     let id1=ticket.TicketId;
     let id2=ticket.FlightId;
      return this.http.put<any>(this.baseUrl+"/cancelticket/"+id1+"/"+id2,JSON.stringify(ticket),this.httpOptions);
    }
  addBooking(booking:Booking){
    return this.http.post<Booking>(this.baseUrl,JSON.stringify(booking),this.httpOptions);
  }

    updatebooking(booking){
      let id1=booking.BookingId;
      return this.http.put<any>(this.baseUrl+"/"+id1,JSON.stringify(booking),this.httpOptions);
    }
  

}