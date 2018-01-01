import { Injectable } from '@angular/core';
import { Course, CourseParticulars } from './course.model';
import { Observable }     from 'rxjs/Observable';

import { RequestOptions, Headers, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'

import 'rxjs/add/operator/map';


@Injectable()
export class CourseService {
	private headers = new Headers({ 'Content-Type': 'application/json' });

	constructor(private http: Http) { }
  	
	createCourse(course: Course): Promise<Course> {
        return this.http
          .post("http://localhost:9003/course", JSON.stringify(course), { headers: this.headers })
          .toPromise()
          .then(res => res.json() as Course)
          .catch(this.handleError);
	}
    
    getCourse(course: Course):Observable<Course> {
        return this.http.get('http://localhost:9003/course/' + course.courseId).map(res => res.json()).map((data: Course) => {
        console.log(data);
        return data as Course;
      });
    }

    getCourses(entityId: Number, schoolYearId: Number):Observable<Array<Course>> {
        return this.http.get('http://localhost:9003/course/' + entityId + "/" + schoolYearId).map(res => res.json()).map((data: Array<Course>) => {
        console.log(data);
        return data as Course[];
      });
    }

	private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}