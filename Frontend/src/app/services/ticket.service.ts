import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../models/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  public tickets:Ticket[];

  constructor(private http:HttpClient) { }

  baseUrl : string = "https://localhost:44374/api/tickets";
  addTickets(){
      return this.http.post<Ticket[]>(this.baseUrl,JSON.stringify(this.tickets),this.httpOptions);
  }
}
