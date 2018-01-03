import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'header-app',
  templateUrl: './header.view.html'
})
export class HeaderComponent {
  	
  	constructor(
    	private authenticationService: AuthenticationService,
    	private router: Router,
  	) { }

	logout(){
    	this.authenticationService.logout();
    	this.router.navigate(['./login']);
  	}
}