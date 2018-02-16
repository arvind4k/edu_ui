import { Component, Input } from '@angular/core';
import { Address, Action, AddressType } from './address.model';
import { AuthenticationService } from '../../login/authentication.service';
import { AddressService } from './address.service';
import { COUNTRIES } from '../../common/data'
import { CommonService } from '../../common/common.service'
import { Router } from '@angular/router';

@Component({
  selector: 'address-app',
  templateUrl: './address.view.html'
})
export class AddressComponent {
  model = new Address();
  addressTypes = ['HOME' , 'RESIDENTIAL' , 'BUSINESS' , 'PERMANENT' , 'RENTED' , 'OFFICE'];
  countries=COUNTRIES;
  addresses:Array<Address>=[];
  userId: string;
  submitted=false;

  constructor(
    private addressService: AddressService, 
    private router: Router,
    private authenticationService: AuthenticationService,
    private commonService: CommonService
  ) 
  {}
  
  ngOnInit(): void {
    this.userId=this.authenticationService.getUserId();
    this.model.modId=this.userId;
    this.model.addressType='HOME';
    this.model.country='IND';
    this.getAddressDetails(this.userId);
      if(this.addresses==null || this.addresses.length<=0){
          this.addresses=[];
      }
  }
  
  addMore(){
    this.addresses.push(this.model);
    this.resetAddress();
  }

  viewAddressInfo(i:any){
    this.model=this.addresses[i];
  }

  async saveAddress() {
    if(this.model.addressId==null){
      this.addresses.push(this.model);
    }
    console.log("address ========== ",this.addresses);
    for(let i=0;i<this.addresses.length;i++){
      await this.addressService.saveAddress(this.addresses[i]).then(result => this.addresses[i]=result); 
    }
    this.resetAddress();
  }

  async getAddressDetails(modId: string){
      await this.addressService.getAddressesByModId(modId).subscribe((data: Address[]) => {
        this.addresses = data;
        for(let i=0;i<this.addresses.length;i++){
          this.addresses[i].countryName=this.commonService.getCountryName(this.addresses[i].country);
        }
      });
  }

  resetAddress(){
    this.model=new Address();
    this.model.modId=this.userId;
    this.model.addressType='HOME';
    this.model.country='IND';
  }
  /*async getOneAddress() {
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
    //this.message = "Record saved successfully......";
  }

  async onActionGet() {
    this.submitted = true; 
    this.getOneAddress();
    this.message = "Record retrieved......";
    this.action.submethod = 'View';

  } */
} 