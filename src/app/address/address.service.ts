import { Injectable } from '@angular/core';
//import { COUNTRIES } from '../common/data';
//import { Country } from '../common/common.model';
import { Address } from './address.model';
import { Observable }     from 'rxjs/Observable';

import { RequestOptions, Headers, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'

import 'rxjs/add/operator/map';


@Injectable()
export class AddressService {
	private headers = new Headers({ 'Content-Type': 'application/json' });

	constructor(private http: Http) { }
  	
	createAddress(address: Address): Promise<Address> {
        return this.http
          .post("http://localhost:1902/address", JSON.stringify(address), { headers: this.headers })
          .toPromise()
          .then(res => res.json() as Address)
          .catch(this.handleError);
    }
    
    createAddresses(addresses: Array<Address>): Promise<Array<Address>> {
        return this.http
          .post("http://localhost:1902/address", JSON.stringify(addresses), { headers: this.headers })
          .toPromise()
          .then(res => res.json() as Array<Address>)
          .catch(this.handleError);
	}
  

    getAddress(address: Address):Observable<Address> {
        return this.http.get('http://localhost:1902/address/' + address.addressId).map(res => res.json()).map((data: Address) => {
        console.log(data);
        return data as Address;
      });
    }
//http://localhost:1902/address/search/findByModId?modId=1&moduleName=test
    /*getAddresses(moduleId: String):Observable<Array<Address>> {
        return this.http.get('http://localhost:1902/address/search/findByModId?modId=' + moduleId).map(res => res.json()).map((data: Array<Address>) => {
        console.log(data);
        return data["_embedded"].address as Address[];
      });
    }*/

    getAddresses(moduleId: String, moduleName: String):Observable<Array<Address>> {
        return this.http.get('http://localhost:1902/address/search/findByModIdAndModuleName?modId=' + moduleId + '&moduleName=' + moduleName).map(res => res.json()).map((data: Array<Address>) => {
        console.log(data);
        return data["_embedded"].address as Address[];
      });
    }

	private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}