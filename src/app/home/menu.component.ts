import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'menu-app',
  templateUrl: './menu.view.html'
})
export class MenuComponent {
  title = 'eSchool';
  loggedInUser: string;
  profileImage: string;
  
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.authenticationService.getFullName();
    this.profileImage='/assets/images/profile.jpg';
  }

	logout(){
    this.authenticationService.logout();
    this.router.navigate(['./login']);
  }
}