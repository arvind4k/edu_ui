import { Component } from '@angular/core';
import { User } from './user.model';
import { GENDER } from '../../common/data'
import { Gender } from '../../common/common.model'
import { ProfileService } from './profile.service';
import { AuthenticationService } from '../../login/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'personalinfo-app',
  templateUrl: './personalinfo.view.html'
})

export class PersonalInfoComponent {
  model = new User();
  userId: string;
  genderList=GENDER;

  constructor(
    private profileService: ProfileService, 
    private authenticationService: AuthenticationService,
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.userId=this.authenticationService.getUserId();
    if(null!=this.userId){
      this.getUser(this.userId);
    }
  }

  async saveUser() {
    await this.profileService.saveUser(this.model).then(result => this.model=result); 
  }

  getUser(userId: string){
    this.profileService.getUser(userId).subscribe((data: User) => {
      this.model = data;
    });
  }
} 