import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'home-app',
  templateUrl: './home.view.html'
})
export class HomeComponent {
	
	isProfileComplete:boolean;
	constructor(private authenticationService: AuthenticationService){}
	ngOnInit(): void {
    	this.isProfileComplete = this.authenticationService.isProfileComplete();
  	}
}