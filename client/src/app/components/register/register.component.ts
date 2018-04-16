import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../services/auth.service";
import { Student } from "../../models/student";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  message;
  messageClass;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router)
  {
      this.form= this.formBuilder.group // Create Angular 2 Form when component loads
      ({
        firstName: [''],
        lastName: [''],
        email: ['', Validators.email],
        phone: [''],
        passwords: formBuilder.group
        ({
          password: [''],
          confirmPass: ['']
        }, {validator: this.matchingPass('password', 'confirmPass')}),// Add custom validator to form for matching passwords
        studentNumber: [''],
        program: [''],
        address: [''],
        city: ['']
      })
  }

  //Register student
  registerStudent()
  {
      const student = new Student
      (
        this.form.value.email,
        this.form.value.passwords.password,
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.phone,
        this.form.value.studentNumber,
        this.form.value.program,
        this.form.value.address,
        this.form.value.city,
        0
      );

      this.authService.register(student).subscribe(
        res => {}
      );
  }

  //Function to ensure passwords match
  matchingPass(password, confirm)
  {
    return (group: FormGroup) =>
    {
      if (group.controls[password].value === group.controls[confirm].value)
      {
        return null; // Return as a match
      }
      else
      {
        return {'matchingPass': true}; // Return as error: do not match
      }
    }
  }


  ngOnInit() {
  }

}
