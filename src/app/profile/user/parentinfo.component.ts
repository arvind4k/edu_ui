import { Component } from '@angular/core';
import { ParentDetails } from './user.model';
import { ProfileService } from './profile.service';
import { AuthenticationService } from '../../login/authentication.service';
import { CourseService } from '../../admin/course/course.service'
import { Course } from '../../admin/course/course.model'
import { RELATIONSHIP } from '../../common/data'
import { CommonService } from '../../common/common.service'
import { Router } from '@angular/router';

@Component({
  selector: 'parentinfo-app',
  templateUrl: './parentinfo.view.html'
})

export class ParentInfoComponent {
  model = new ParentDetails();
  relationships=RELATIONSHIP;
  parents:Array<ParentDetails>=[];
  userId: string;

  constructor(
      private profileService: ProfileService, 
      private authenticationService: AuthenticationService,
      private router: Router,
      private commonService: CommonService
  ){}
  
  ngOnInit(): void {
      this.userId=this.authenticationService.getUserId();
      this.model.relationship="0";
      this.getParentDetails(this.userId);
      if(this.parents==null || this.parents.length<=0){
          this.parents=[];
      }
  }

  addMore(){
    this.model.relationshipDesc=this.commonService.getRelationshipDesc(this.model.relationship);
    this.parents.push(this.model);
    this.resetModelObj();
  }

  viewParentInfo(i:any){
    this.model=this.parents[i];
  }

  async saveParentDetails() {
    if(this.model.guardianId==null){
      this.parents.push(this.model);
    }
    for(let i=0;i<this.parents.length;i++){
      this.parents[i].userId=this.userId;
      await this.profileService.saveParentDetails(this.parents[i]).then(result => this.parents[i]=result); 
    }
    this.resetModelObj();
  }

  async getParentDetails(userId: string){
      await this.profileService.getParentDetails(userId).subscribe((data: ParentDetails[]) => {
        this.parents = data;
        for(let i=0;i<this.parents.length;i++){
          this.parents[i].relationshipDesc=this.commonService.getRelationshipDesc(this.parents[i].relationship);
        }
      });
  }

  resetModelObj(){
      this.model=new ParentDetails();
      this.model.relationship="0";
  }
} 