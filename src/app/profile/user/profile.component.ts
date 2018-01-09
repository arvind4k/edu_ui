import { Component } from '@angular/core';
import { User, Profile, Guardian, Qualification, SchoolDetails } from './user.model';
import { ProfileService } from './profile.service';
import { AuthenticationService } from '../../login/authentication.service';
import { AddressService } from '../../common/address/address.service';
import { Address } from '../../common/address/address.model';
import { CourseService } from '../../admin/course/course.service'
import { Course } from '../../admin/course/course.model'
import { Router } from '@angular/router';

@Component({
  selector: 'profile-app',
  templateUrl: './profile.view.html'
})

export class ProfileComponent {
  model = new Profile();
  courses:Array<Course>=[];
  userId: string;

  constructor(
      private profileService: ProfileService, 
      private authenticationService: AuthenticationService,
      private courseService: CourseService,
      private router: Router
  ){}
  
  ngOnInit(): void {
      this.model.guardians.push(new Guardian());
      this.model.addresses.push(new Address());
      this.model.qualifications.push(new Qualification());
      this.userId=this.authenticationService.getUserId();
      this.getCourses();
      this.model.schoolDetails.courseId="0";
      if(null!=this.userId){
        this.getUser(this.userId);
      }
  }

  async saveUser() {
      await this.profileService.saveUser(this.model.user).then(result => this.model.user=result); 
      //this.router.navigate(['/feeParticular',this.model.feeCategoryId]);
  }

  async saveSchoolDetails() {
      this.model.schoolDetails.userId=this.model.user.userId;
      console.log("userId = "+this.model.user.userId);
      console.log("input = ",this.model.schoolDetails.enrollmentDate);
      await this.profileService.saveSchoolDetails(this.model.schoolDetails).then(result => this.model.schoolDetails=result); 
      //this.router.navigate(['/feeParticular',this.model.feeCategoryId]);
  }

  getUser(userId: string){
      this.profileService.getUser(userId).subscribe((data: User) => {
      this.model.user = data;
      console.log('data ='+data);
      });
  }

  getCourses(){
    this.courseService.getCourses(25,2).subscribe((data: Array<Course>) => {
      this.courses = data;
      });
  }

  addMoreGuardian(){
      this.model.guardians.push(new Guardian());
  }

  addMoreQualification(){
      this.model.qualifications.push(new Qualification());
  }

  addMoreAddress(){
      this.model.addresses.push(new Address());
  }
} 