import { Component, Input } from '@angular/core';
import { Eorg, Action} from './eorg.model';
import { EorgService } from './eorg.service';
import {AddressService} from '../../common/address/address.service';
import { Address } from '../../common/address/address.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'eorg-app',
  templateUrl: './eorg.view.html'
})

export class EorgComponent {
  message = '';
  model = new Eorg();
  //model: Eorg;
  address: Address;
  action = new Action();
  //action: Action;
  eorgs = new Array<Eorg>();
  //eorgs: Array<Eorg>;
  addresses = new Array<Address>();
  //addresses: Array<Address>;
  submitted = false;

  constructor(private eorgService: EorgService, private addressService: AddressService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { 
    let type = this.activatedRoute.snapshot.paramMap.get('action');
    console.log("Action");
    console.log(type);
    this.action.method = type;
  }

  //this method will be called when Org type is selected and it will be selected only when new recording is being Created
  onSelectOrgType(){
    if (this.model.entityType=="School"){
      this.action.entityTypeFetch = "Suborg";
    }
    else if (this.model.entityType=="Suborg"){
      this.action.entityTypeFetch = "Org";
    }
    else{
      this.action.entityTypeFetch = "None";
    }
    this.getAllEorgs();
    
  }

//this method is to initialize first address object during Create or Non-Create. 
// Create objects ensures that atleast one address object is displayed
  onSelectCreate(){
    this.address = new Address();
    this.address.moduleName = 'Eorg';
    this.addresses.push(this.address);
    this.message='';
  }
  onSelectNonCreate(){
    this.message='';
  }

  //this method will get Entity details. With that it will bring all addresses also. All org are fetched to display in select box. 
  onActionGet() {
    this.submitted = true; 
    this.getOneEorg();
    this.message = "Record retrieved......";
    this.action.submethod = 'View';
  }
  
  async getOneEorg() {
    await this.eorgService.getEorg(this.model).subscribe((data: Eorg) => {
    this.model = data;
    });
    
    this.getAddresses();

    //this is applicable only for View/Update/Delete mode.
    this.getAllEorgs();
  }

  async getAddresses() {
    await this.addressService.getAddresses(this.model.entityId, "Eorg").subscribe((data: Array<Address>) => {
        this.addresses = data;
    });
  }

//This method gets all organization name from Eorg table. We have to filter this as per Type
  getAllEorgs() {
    this.eorgService.getEorgs().subscribe((data: Array<Eorg>) => {
            this.eorgs = data;
    });
  }

//this method is called when create/update is selected. At the same time it will reinitialize all important object.
   createEntity(){
     this.saveEntity();
    
    /* this.addresses = new Array<Address>();
     this.eorgs = new Array<Eorg>();
     this.model = new Eorg();
     this.action.method = '';
     this.action.submethod = '';*/
  }

  async saveEntity() {
    if (this.action.method == "Delete") {
      this.model.obsolete = '1';
    } 
    this.submitted = true; 
    console.log(JSON.stringify(this.model));
    await this.eorgService.createEorg(this.model).then(result => this.model=result); 
    this.message = "Record saved successfully......";
    this.saveAddress();

    this.message = "Operation perfomed succesfully..."
  }
  async saveAddress(){
    for(var i = 0; i < this.addresses.length; i++){
      this.addresses[i].modId = this.model.entityId;
      await this.addressService.createAddress(this.addresses[i]).then(result => this.addresses[i]=result);
   }
  }
  
} 