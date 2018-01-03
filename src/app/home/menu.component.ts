import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service'
import { Router, ActivatedRoute } from '@angular/router';
/*import { MENU,MenuItem } from './menu.items'*/
import "../../assets/js/scripts.js";

@Component({
  selector: 'menu-app',
  templateUrl: './menu.view.html'
})
export class MenuComponent {
  title = 'eSchool';
  loggedInUser: string;
  profileImage: string;
  //menuItems:Array<MenuItem>=[];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.authenticationService.getFullName();
    this.profileImage='/assets/images/profile.jpg';
    //this.displayMenuItems();
  }

  ngAfterViewInit(): void {
    var externalScript = document.createElement("script");
    externalScript.setAttribute("id", "testScript");
    externalScript.setAttribute("src", "assets/js/scripts.js");
    document.body.appendChild(externalScript);
  }

  /*displayMenuItems(){
    this.menuItems=MENU;
    console.log(this.menuItems);
  }*/
}