import { Component } from '@angular/core';
import { AdditionalDetails } from './user.model';
import { ProfileService } from './profile.service';
import { AuthenticationService } from '../../login/authentication.service';
import { RELIGIONS, NATIONALITIES, CASTES } from '../../common/data'
import { Router } from '@angular/router';

@Component({
  selector: 'additionalinfo-app',
  templateUrl: './additionalinfo.view.html'
})

export class AdditionalInfoComponent {
  model = new AdditionalDetails();
  religions=RELIGIONS;
  nationalities=NATIONALITIES;
  castes= CASTES;
  userId: string;

  constructor(
      private profileService: ProfileService, 
      private authenticationService: AuthenticationService,
      private router: Router
  ){}
  
  ngOnInit(): void {
      this.userId=this.authenticationService.getUserId();
      this.model.religion="0";
      this.model.nationality="0";
      this.model.caste="0";

      if(null!=this.userId){
        this.getAdditionalDetails(this.userId);
      }
  }

  async saveAdditionalDetails() {
      this.model.userId=this.userId;
      await this.profileService.saveAdditionalDetails(this.model).then(result => this.model=result); 
  }

  getAdditionalDetails(userId: string){
      this.profileService.getAdditionalDetails(userId).subscribe((data: AdditionalDetails) => {
      this.model = data;
      });
  }
} 