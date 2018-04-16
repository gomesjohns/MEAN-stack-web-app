import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Student } from "../models/student";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/do';


@Injectable()
export class AuthService {

  result: any;
  private currentStudent:any;
  authToken;
  user;

  constructor(private http: HttpClient)
  {}

  register(student:Student)
  {
    const httpOptions = {headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'application/json'
      })
    };
    return this.http.post('account/register', student, httpOptions).map(res=> {return res;});
  }

  // Function to login user
  login(student : Student): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'application/json'
      })
    };
    return this.http.post('account/login', student, httpOptions).map(res => {return res;});
  }

  logout(): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'application/json'
      })
    };
    return this.http.post('account/logout', httpOptions).map(res => {return res;});
  }

  getCurrentStudent()
  {
    return this.currentStudent;
  }
}
