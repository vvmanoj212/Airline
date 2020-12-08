import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seat } from '../models/Seat';

@Injectable({
  providedIn: 'root'
})
export class SeatqueryService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http:HttpClient) { }
  baseUrl : string = "https://localhost:44374/api/seats";

  getSeats(flightId,departdate){
      return this.http.get<Seat[]>(this.baseUrl+"/seatStatus/"+flightId+"\\"+departdate,this.httpOptions);
    }

}
