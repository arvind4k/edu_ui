import { Component, Input } from '@angular/core';
import { Address, Action} from './address.model';
import { AddressService } from './address.service';
//import { Address } from '../common/common.model'
import { Router } from '@angular/router';
import { AddressType } from '../common/common.model';

@Component({
  selector: 'address-app',
  templateUrl: './address.view.html'
})
export class AddressComponent {
  @Input() model: Address;
  //model: Address;

  message = '';
  //model = new Address();
  addressTypes = ['HOME' , 'RESIDENTIAL' , 'BUSINESS' , 'PERMANENT' , 'RENTED' , 'OFFICE'];
  //errorMsg: string;
  action: Action;
  submitted = false;

  constructor(private addressService: AddressService, private router: Router) { }
  ngOnInit(): void {

    this.action = new Action();
   // this.model = this.addresso;
//console.log("Address ID:"+ this.model.addressId)
//console.log("Address address1:"+ this.model.address1)
  }

  
  async getOneAddress() {
    await this.addressService.getAddress(this.model).subscribe((data: Address) => {
    this.model = data;
    });
  }

  async onSubmit() {
    if (this.action.method == "Delete") {
      this.model.obsolete = '1';
    } 
    this.submitted = true; 
    console.log(JSON.stringify(this.model));
    //await this.userService.createUser(this.model).then(result => this.model=result, error => this.errorMsg="Error occured"); 
    await this.addressService.createAddress(this.model).then(result => this.model=result); 
    this.message = "Record saved successfully......";

  }

  async onActionGet() {
    this.submitted = true; 
    this.getOneAddress();
    this.message = "Record retrieved......";
    this.action.submethod = 'View';

  }
  
} 