import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private rootUrl = "./";

  constructor(private http: HttpClient) { }

  register(data) {
    const headers = new HttpHeaders({'Content-Type':'application/json'})
    // console.log(JSON.stringify(data));
    return this.http.post(this.rootUrl+'register',JSON.stringify(data),
    {headers: headers});  
  }

}
