import { Component } from '@angular/core';
import { User, Profile, Guardian, Qualification, SchoolDetails } from './user.model';
import { ProfileService } from './profile.service';
import { AddressService } from '../../common/address/address.service';
import { Address } from '../../common/address/address.model';
import { Router } from '@angular/router';

@Component({
  selector: 'profile-app',
  templateUrl: './profile.view.html'
})

export class ProfileComponent {
  model = new Profile();

  constructor(private profileService: ProfileService, private router: Router) { }
  
  ngOnInit(): void {
    this.model.guardians.push(new Guardian());
    this.model.addresses.push(new Address());
    this.model.qualifications.push(new Qualification());
  }

  addMoreGuardian(){
    this.model.guardians.push(new Guardian());
  }

  addMoreQualification(){
    this.model.qualifications.push(new Qualification());
  }

  addMoreAddress(){
    this.model.addresses.push(new Address());
  }
} 