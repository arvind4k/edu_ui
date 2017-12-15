import { Component } from '@angular/core';
import { User } from './user.model'
import { UserService } from './user.service'
import { Country } from '../common/common.model'

@Component({
  selector: 'user-app',
  templateUrl: './user.view.html'
})
export class UserComponent {
  model = new User();
  countries:Country[];
  submitted = false;
  constructor(private userService: UserService) { }
  
  getCountries(): void {
    this.userService.getCountries().then(countries => this.countries = countries);
    //this.userService.getCountry();
      
    //console.log("test =============== "+this.userService.getUser('11718'));
  }

  ngOnInit(): void {
    this.getCountries();
  }

  onSubmit() { 
    this.submitted = true; 
    console.log('Username = '+this.model.username);
  }
} 