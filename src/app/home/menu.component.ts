import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'menu-app',
  templateUrl: './menu.view.html'
})
export class MenuComponent {
  	
  	constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
    ) { }

	logout(){
        this.authenticationService.logout();
        this.router.navigate(['./login']);
    }
}