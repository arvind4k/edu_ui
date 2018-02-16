import { Injectable } from '@angular/core';
import { Address } from './address.model';
import { Observable }     from 'rxjs/Observable';
import { AuthenticationService } from '../../login/authentication.service'

import { RequestOptions, Headers, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'

import 'rxjs/add/operator/map';


@Injectable()
export class AddressService {
	private headers = new Headers({
     'Content-Type': 'application/json; charset=utf-8',
     'Accepts':'text/plain ; application/json',
     'Access-Control-Allow-Origin':'*',
     'Authorization': 'Bearer ' + this.authenticationService.getToken()
     });

	constructor(
      private http: Http, 
      private authenticationService: AuthenticationService
  ) {}
  	
	saveAddress(address: Address): Promise<Address> {
      return this.http
        .post("http://localhost:9005/address", JSON.stringify(address), { headers: this.headers })
        .toPromise()
        .then(res => res.json() as Address)
        .catch(this.handleError);
  }
    
  saveAddresses(addresses: Array<Address>): Promise<Array<Address>> {
      return this.http
        .post("http://localhost:9005/address", JSON.stringify(addresses), { headers: this.headers })
        .toPromise()
        .then(res => res.json() as Array<Address>)
        .catch(this.handleError);
	}

  getAddress(address: Address):Observable<Address> {
      return this.http.get('http://localhost:9005/address/' + address.addressId).map(res => res.json()).map((data: Address) => {
      console.log(data);
      return data as Address;
    });
  }

  getAddresses(moduleId: String, moduleName: String):Observable<Array<Address>> {
      return this.http.get('http://localhost:9005/address/search/findByModIdAndModuleName?modId=' + moduleId + '&moduleName=' + moduleName).map(res => res.json()).map((data: Array<Address>) => {
      console.log(data);
      return data["_embedded"].address as Address[];
    });
  }

  getAddressesByModId(moduleId: String):Observable<Array<Address>> {
      return this.http.get('http://localhost:9005/address/search/findByModId?modId=' + moduleId)
      .map(res => res.json()).map((data: Array<Address>) => {
        console.log(data);
        return data["_embedded"].address as Address[];
      });
  }

	private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}