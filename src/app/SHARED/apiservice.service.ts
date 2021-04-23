import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ApiserviceService {


  constructor(private http: HttpClient) { }

  private rootURL = environment.apiUrl
  private token = localStorage.getItem('token')
  private usertokenId = localStorage.getItem('id')


  methPOst(path: string = "", param: object): Observable<any> {
    let options = {
      headers: this.setHeaders()
    }
    return this.http.post(this.myurl(this.rootURL, path), param, options)
  }






  private setHeaders() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': '*',
      'Authorization': `${this.getToken()}`,
      'usertoken':`${this.usertoken()}`
    });
    return headers;
  }
  getToken() {
    //store to local and fetch here
    return this.token;
  }
  usertoken(){
    return this.usertokenId;
  }
  private myurl(host,apiPath) {
    return `${host}/${apiPath}`;
  }
} 
