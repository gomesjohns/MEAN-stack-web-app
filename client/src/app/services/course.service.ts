import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from "../models/student";
import {Course} from '../models/course';
import {Observable} from 'rxjs/Observable';
import "rxjs/add/operator/map";


@Injectable()
export class CourseService {

  constructor(private http: HttpClient)
  {
    console.log('Course Service Initialized...')
  }

  //Get a lit of all the courses
  getAllCourses(): Observable<any[]>
  {
      return this.http.get('/course/all-course').map(res => {return res as any[];});
  }

  //Get a list of courses assigned to student
  getCoursesByStudent(studentId: string) : Observable<any[]>
  {
      return this.http.get('/student/student-course-list/' + studentId).map(res => {return res as any[];});
  }

  //Assign course to student
  assignCourse(studentId: string, courseId: string): Observable<any[]>
  {
      return this.http.get('/student/add-course/' + studentId+ '/' + courseId).map(res => {return res as any[];});
  }

  //Drop course from student's course list
  dropCourse(studentId: string, courseId: string): Observable<any[]>
  {
      return this.http.get('/student/drop-course/' + studentId+ '/' + courseId).map(res => {return res as any[];});
  }
}
