import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';
import { ProfileService } from './profile.service';
 
@Component({
    selector: 'user-app',
    templateUrl: './user.view.html'
})

export class UserComponent {
    model = new User();
    error = '';
    loading = false;
 
    constructor(
        private router: Router,
        private profileService:ProfileService
    ) {}

    async signup(){
        this.loading = true;
        console.log('model = ',this.model);
        if(this.model.termsAndCondition){
            this.model.termsAndCondition='1';
        }
        this.model.isComplete="0";
        this.model.obsolete="0";
        await this.profileService.createUser(this.model).then(result => this.model=result); 
    }
}