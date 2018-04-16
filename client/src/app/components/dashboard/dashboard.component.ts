import {Component, Input, OnInit} from '@angular/core';
import { CourseService } from "../../services/course.service";
import { Course } from "../../models/course";
import {ActivatedRoute, Router} from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit
{
  courses;
  coursesRegistered;
  userId;
  userName;
  userEmail;
  studentNum;
  msg;
  returnMsg;

  constructor(private courseService: CourseService, private authService: AuthService, private router: Router)
  {
      this.userId= sessionStorage.getItem('studentId');
      this.userName= sessionStorage.getItem('studentName');
      this.userEmail= sessionStorage.getItem('studentEmail');
      this.studentNum= sessionStorage.getItem('studentNum');
      if(this.userId == null)
      {
        this.router.navigate(['/']);
      }
  }

  ngOnInit()
  {
    this.getAllCourses();
    this.getCoursesByStudent()
  }

  //Assign course to student
  assignCourse(courseId: string)
  {
    this.courseService.assignCourse(this.userId, courseId).subscribe(coursesRegistered=>
    {
      this.coursesRegistered= coursesRegistered;
    })
  }

  //Drop course from student's course list
  dropCourse(courseId: string)
  {
    this.courseService.dropCourse(this.userId, courseId).subscribe(coursesRegistered=>
    {
      this.coursesRegistered= coursesRegistered;
      console.log("courses registered", this.coursesRegistered);
    });
    this.getCoursesByStudent();
  }

  //Get a lit of all the courses
  getAllCourses()
  {
    this.courseService.getAllCourses().subscribe(courses=>
      {
        this.courses= courses;
        console.log("all courses", courses);
      })
  }

  //Get a list of courses assigned to student
  getCoursesByStudent()
  {
    this.courseService.getCoursesByStudent(this.userId).subscribe(coursesRegistered=>
      {
        this.checkStatus(coursesRegistered);
        this.coursesRegistered= coursesRegistered;
      })
  }

  //Check if returned object is empty, display necessary messages
  checkStatus(courseReg)
  {
    if (courseReg.length <=0)
    {
      this.returnMsg= "Student is currently not enrolled in any courses";
    }
  }


}
