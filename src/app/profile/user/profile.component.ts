import { Component } from '@angular/core';
import { User } from './user.model';
import { ProfileService } from './profile.service';
import {AddressService} from '../../common/address/address.service';
import { Address } from '../../common/address/address.model';
import { Router } from '@angular/router';

@Component({
  selector: 'profile-app',
  templateUrl: './profile.view.html'
})

export class ProfileComponent {
  model = new User();

  constructor(private profileService: ProfileService, private router: Router) { }
   
} 