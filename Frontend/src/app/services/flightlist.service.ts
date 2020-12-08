import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import {flight, flight1} from '../models/flight';
import { FlightSchedule } from '../models/FlightSchedule';

@Injectable({
  providedIn: 'root'
})
export class FlightlistService {httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
baseUrl : string="https://localhost:44374/api/flights";
constructor(private http:HttpClient) { }
 getallflights(){
  return this.http.get<flight[]>(this.baseUrl+"/GetAll");
 }
 Addflight(flights){
   return this.http.post<flight>(this.baseUrl,JSON.stringify(flights),this.httpOptions);
 }
 deleteFlight(id){
  return this.http.delete<flight>(this.baseUrl+"\\"+id,this.httpOptions);
 }
 searchFlight(source,destination,departdate,passengercount){
    return this.http.get<flight1[]>(this.baseUrl+"/SearchFlight\\"+source+"\\"+destination+"\\"+departdate+"\\"+passengercount,this.httpOptions);
 }
 addflightschedule(fls){return this.http.post<any>(this.baseUrl+"/flightschedule",JSON.stringify(fls),this.httpOptions);
}
}
