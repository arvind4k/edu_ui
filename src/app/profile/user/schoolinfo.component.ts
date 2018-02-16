import { Component } from '@angular/core';
import { SchoolDetails } from './user.model';
import { ProfileService } from './profile.service';
import { AuthenticationService } from '../../login/authentication.service';
import { CourseService } from '../../admin/course/course.service'
import { Course } from '../../admin/course/course.model'
import { STUDENT_CATEGORIES } from '../../common/data'
import { Router } from '@angular/router';

@Component({
  selector: 'schoolinfo-app',
  templateUrl: './schoolinfo.view.html'
})

export class SchoolInfoComponent {
  model = new SchoolDetails();
  courses:Array<Course>=[];
  studentCategories=STUDENT_CATEGORIES;
  userId: string;

  constructor(
      private profileService: ProfileService, 
      private authenticationService: AuthenticationService,
      private courseService: CourseService,
      private router: Router
  ){}
  
  ngOnInit(): void {
      this.userId=this.authenticationService.getUserId();
      this.getCourses();
      this.model.courseId="0";
      this.model.transportId="0";

      /*if(null!=this.userId){
        this.getUser(this.userId);
      }*/
  }

  async saveSchoolDetails() {
      this.model.userId=this.model.userId;
      console.log("userId = "+this.model.userId);
      console.log("input = ",this.model.enrollmentDate);
      await this.profileService.saveSchoolDetails(this.model).then(result => this.model=result); 
  }

  getCourses(){
    this.courseService.getCourses(25,2).subscribe((data: Array<Course>) => {
      this.courses = data;
      });
  }
} 