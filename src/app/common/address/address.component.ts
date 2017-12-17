import { Component, Input } from '@angular/core';
import { Address, Action, AddressType } from './address.model';
import { AddressService } from './address.service';
import { Router } from '@angular/router';

@Component({
  selector: 'address-app',
  templateUrl: './address.view.html'
})
export class AddressComponent {
  @Input() model: Address;

  message = '';
  addressTypes = ['HOME' , 'RESIDENTIAL' , 'BUSINESS' , 'PERMANENT' , 'RENTED' , 'OFFICE'];
  action: Action;
  submitted = false;

  constructor(private addressService: AddressService, private router: Router) { }
  ngOnInit(): void {
    this.action = new Action();
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