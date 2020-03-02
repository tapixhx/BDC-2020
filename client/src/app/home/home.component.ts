import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel, FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerService } from 'src/app/services/server.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  resolved(captchaResponse: string) {
    // console.log(`Resolved captcha with response: ${captchaResponse}`);
    // console.log(this.captc);
}
  err:any;
  Loading:Boolean=false;
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
    this.Loading=true;
    // console.log(JSON.stringify(form.value));

    if(!form.value.blood_group){
      form.value.blood_group = "Don't Know"
    }
    // console.log(form.value)
    const value = form.value;
    this.serverservice.register(value)
    .subscribe(
      (response) => {
        // console.log(response);
        this.Loading=false;
        Swal.fire(
          'Success',
          'You have been successfully registered',
          'success'
        )
        form.reset();
      },
      (error: HttpErrorResponse) =>{
        // console.log(error);
        this.err=error;
        this.Loading=false;
        Swal.fire(
          'Please try again!',
          this.err.error.message,
          'error'
        )
        form.reset();
      },
    );
  }

}
