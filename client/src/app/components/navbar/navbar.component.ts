import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {Student} from '../../models/student';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from "../../services/auth.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  user;
  form: FormGroup;
  email: FormControl ;
  password: FormControl;
  msg;
  loggedOut;
  userName;
  errorMessage;
  error:boolean;


  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private location: Location)
  {
    this.user= sessionStorage.getItem('studentId');
    this.userName= sessionStorage.getItem('studentName');
    this.error= false;
    this.createForm();// Create Login Form when component is constructed

  }

  // Function to create login form
  createForm()
  {
    this.form= this.formBuilder.group
    ({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });
  }

  // Function to submit form and login user
  login()
  {
    // Create user object from user's input
    const student= new Student
    (
      this.form.value.email,
      this.form.value.password,
      '',  '', '', '', '', '', '',0
    );

    // Function to store user's token in client local storage
    this.authService.login(student).subscribe(res=>
      {
        if(res.userId)
        {
          this.user= res.userId;
          sessionStorage.setItem('studentId', res.userId);
          sessionStorage.setItem('studentName', res.userName);
          sessionStorage.setItem('studentEmail', res.userEmail);
          sessionStorage.setItem('studentNum', res.studentNum);
          this.router.navigate(['/dashboard']); // Navigate to dashboard view
        }
        else
        {
          this.error= true;
          this.errorMessage= "Wrong credentials";
        }
      }
    );
  }

  logout()
  {
    sessionStorage.clear();
    this.authService.logout().subscribe(res => this.msg = res);
    sessionStorage.setItem('userStatus', "loggedOut");
  }

  ngOnInit() {
  }
}
