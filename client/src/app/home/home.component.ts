import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
}


  course:string;
  year: any[] = [
    { id: 0, name: '1' },
    { id: 1, name: '2' },
    { id: 2, name: '3' },
    { id: 3, name: '4' },
  ];
  courses: any[] = [
    { id: 0, name: 'B.Tech' },
    { id: 1, name: 'MCA' },
    { id: 2, name: 'MBA' }
  ];
  

  constructor(private serverservice: ServerService,) { }

  ngOnInit() {
  }
  selectOption(id: any) {
    this.course = id;
    // console.log(this.branch);
  }

  onSubmit(form : NgForm) {
    console.log(JSON.stringify(form.value));
    const value = form.value;
    this.serverservice.register(value.student_no,value.name,value.email,value.course,value.year,value.blood_group,value.gender,value.hosteller,value.contact_no)
    .subscribe(
      (response) => {
        console.log(response);
      },
      (error: HttpErrorResponse) =>{
        console.log(error);
      },
    );
  }

}
