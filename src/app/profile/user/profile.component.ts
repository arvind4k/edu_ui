import { Component } from '@angular/core';
import { Profile, Action} from './user.model';
import { ProfileService } from './profile.service';
import {AddressService} from '../../common/address/address.service';
import { Address } from '../../common/address/address.model';
import { Router } from '@angular/router';

@Component({
  selector: 'user-app',
  templateUrl: './user.view.html'
})

export class ProfileComponent {
  message = '';
  model = new Profile();
  //errorMsg: string;
  action: Action;
  submitted = false;
  address:Address;
  addresses:Array<Address>;

  constructor(private profileService: ProfileService, private router: Router, private addressService: AddressService) { }
  
  ngOnInit(): void {
    this.action = new Action();
    this.address = new Address();
    this.addresses = new Array<Address>();
  }

  onSelectCreate(){
    this.address = new Address();
    this.address.moduleName = 'User';
    this.addresses.push(this.address);
    this.message='';
  }
  
  async getOneUser() {
    await this.profileService.getUser(this.model).subscribe((data: Profile) => {
    this.model = data;
    });
    
    await this.addressService.getAddresses(this.model.userId, "User").subscribe((data: Array<Address>) => {
      this.addresses = data;
  });
  }

  async onSubmit() {
    if (this.action.method == "Delete") {
      this.model.obsolete = '1';
    } 
    this.submitted = true; 
    await this.profileService.createUser(this.model).then(result => this.model=result); 
    this.message = "Record saved successfully......";
  
    for(var i = 0; i < this.addresses.length; i++){
      this.addresses[i].modId = this.model.userId;
      this.addresses[i].moduleName = 'User'
      await this.addressService.createAddress(this.addresses[i]).then(result => this.addresses[i]=result);
   }
  }

  async onActionGet() {
    this.submitted = true; 
    this.getOneUser();
    this.message = "Record retrieved......";
    this.action.submethod = 'View';
  }
} 