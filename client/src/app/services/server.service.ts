import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private rootUrl = "https://54b95205.ngrok.io";

  constructor(private http: HttpClient) { }

  register(student_no:string,name:string,email:string,course:string,year:string,blood_group:string,gender:string,hosteller:string,contact_no:string) {
    const headers = new HttpHeaders({'Content-Type':'application/json'})
    console.log(JSON.stringify({student_no,name,course,year,blood_group,gender,hosteller,email,contact_no}));
    return this.http.post(this.rootUrl+'/register',JSON.stringify({student_no,name,course,year,blood_group,gender,hosteller,email,contact_no}),
    {headers: headers});  
  }

}
