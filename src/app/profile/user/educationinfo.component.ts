import { Component } from '@angular/core';
import { Education } from './user.model';
import { ProfileService } from './profile.service';
import { AuthenticationService } from '../../login/authentication.service';
import { CommonService } from '../../common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'educationinfo-app',
  templateUrl: './educationinfo.view.html'
})

export class EducationInfoComponent {
  model = new Education();
  educations:Array<Education>=[];
  userId: string;

  constructor(
      private profileService: ProfileService, 
      private authenticationService: AuthenticationService,
      private router: Router,
      private commonService: CommonService
  ){}
  
  ngOnInit(): void {
      this.userId=this.authenticationService.getUserId();
      this.getEducationDetails(this.userId);
      if(this.educations==null || this.educations.length<=0){
          this.educations=[];
      }
  }

  addMore(){
    this.educations.push(this.model);
    this.model=new Education();
  }

  viewEducationInfo(i:any){
    this.model=this.educations[i];
  }

  async saveEducationDetails() {
    if(this.model.educationId==null){
      this.educations.push(this.model);
    }
    for(let i=0;i<this.educations.length;i++){
      this.educations[i].userId=this.userId;
      await this.profileService.saveEducationDetails(this.educations[i]).then(result => this.educations[i]=result); 
    }
    this.model=new Education();
  }

  async getEducationDetails(userId: string){
      await this.profileService.getEducationDetails(userId).subscribe((data: Education[]) => {
        this.educations = data;
      });
  }
} 