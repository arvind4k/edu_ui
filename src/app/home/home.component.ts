import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'home-app',
  templateUrl: './home.view.html'
})
export class HomeComponent implements OnInit {
  	title = 'testApp';
  	isLoggedIn:boolean=false;

  	ngOnInit() {
  		if(this.authenticationService.getToken()!=''){
  			this.isLoggedIn=true;
  		}
  	}

    constructor(
        private authenticationService: AuthenticationService,
    ) { }
}