import { Component } from '@angular/core';
import { User, Action} from './user.model';
import { UserService } from './user.service';
import {AddressService} from '../address/address.service';
import { Address } from '../address/address.model'
import { Router } from '@angular/router';

@Component({
  selector: 'user-app',
  templateUrl: './user.view.html'
})
export class UserComponent {
  message = '';
  model = new User();
  //errorMsg: string;
  action: Action;
  submitted = false;
  address:Address;
  addresses:Array<Address>;

  constructor(private userService: UserService, private router: Router, private addressService: AddressService) { }
  
  ngOnInit(): void {
    //this.model.address = new Address();
    //this.errorMsg = '';
    this.action = new Action();
    //this.action.method = 'Create';
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
    await this.userService.getUser(this.model).subscribe((data: User) => {
    this.model = data;
    });
    
    await this.addressService.getAddresses(this.model.userId, "User").subscribe((data: Array<Address>) => {
      this.addresses = data;
  });
    /*await this.addressService.getAddress(this.address).subscribe((data: Address) => {
      this.address = data;
      });
    this.addresses[0] = this.address;*/
  }

  async onSubmit() {
    if (this.action.method == "Delete") {
      this.model.obsolete = '1';
    } 
    this.submitted = true; 
    //console.log(JSON.stringify(this.model));
    //console.log(JSON.stringify(this.address));
    //await this.userService.createUser(this.model).then(result => this.model=result, error => this.errorMsg="Error occured"); 
    await this.userService.createUser(this.model).then(result => this.model=result); 
    this.message = "Record saved successfully......";
  
    for(var i = 0; i < this.addresses.length; i++){
      this.addresses[i].modId = this.model.userId;
      this.addresses[i].moduleName = 'User'
      await this.addressService.createAddress(this.addresses[i]).then(result => this.addresses[i]=result);
   }
    
    //await this.addressService.createAddress(this.address).then(result => this.address=result); 

  }

  async onActionGet() {
    this.submitted = true; 
    this.getOneUser();
    this.message = "Record retrieved......";
    this.action.submethod = 'View';
    //this.action.readonly = "readonly";
    //this.action.disabled = "true";
  }
  
} 