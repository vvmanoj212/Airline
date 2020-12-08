import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http:HttpClient) { }
  baseUrl : string = "https://localhost:44374/api/users";
  addUser(user){
    return this.http.post<any>(this.baseUrl,JSON.stringify(user),this.httpOptions);
  }
  getUserById(id:string){
    let data={id:id};
    return this.http.get<User>(this.baseUrl,{params:data});
  }
  changePassword(user:User){
    let newuser={
      UserEmailId: user.UserEmailId,
      Password: user.Password,
      Title: user.Title,
      FirstName:user.FirstName,
      LastName: user.LastName,
      DateOfBirth: user.DateOfBirth,
      Age:user.Age,
      MobileNumber: user.MobileNumber
    }
    let data={id:user.UserEmailId};
      return this.http.put<User>(this.baseUrl,newuser,{params:data});
  
    }
}
