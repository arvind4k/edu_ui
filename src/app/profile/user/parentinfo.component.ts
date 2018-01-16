import { Component } from '@angular/core';
import { Parent } from './user.model';
import { ProfileService } from './profile.service';
import { AuthenticationService } from '../../login/authentication.service';
import { CourseService } from '../../admin/course/course.service'
import { Course } from '../../admin/course/course.model'
import { RELATIONSHIP } from '../../common/data'
import { Router } from '@angular/router';

@Component({
  selector: 'parentinfo-app',
  templateUrl: './parentinfo.view.html'
})

export class ParentInfoComponent {
  model = new Parent();
  relationships=RELATIONSHIP;
  parents:Array<Parent>=[];
  userId: string;

  constructor(
      private profileService: ProfileService, 
      private authenticationService: AuthenticationService,
      private router: Router
  ){}
  
  ngOnInit(): void {
      this.userId=this.authenticationService.getUserId();
      this.model.relationship="0";

      /*if(null!=this.userId){
        this.getAdditionalDetails(this.userId);
      }*/
  }

  addMore(){
    this.parents.push(this.model);
    this.model=new Parent();

    console.log(this.parents);
  }

  /*async saveAdditionalDetails() {
      this.model.userId=this.userId;
      await this.profileService.saveAdditionalDetails(this.model).then(result => this.model=result); 
  }

  getAdditionalDetails(userId: string){
      this.profileService.getAdditionalDetails(userId).subscribe((data: AdditionalDetails) => {
      this.model = data;
      });
  }*/
} 