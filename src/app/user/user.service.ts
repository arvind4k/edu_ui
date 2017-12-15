import { Injectable } from '@angular/core';
import { COUNTRIES } from '../common/data';
import { Country } from '../common/common.model';
import { User } from './user.model';
import { Observable }     from 'rxjs/Observable';

import { RequestOptions, Headers, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'

import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

	constructor(private http: HttpClient) { }
  	
    getCountries(): Promise<Country[]> {
    	return Promise.resolve(COUNTRIES);
  	}

  	user:User
  	

  	/*getUser(userId: string) {
  		return this.http.get("http://localhost:1000/user/"+userId).map((response: Response) => <User>response.json());
    }*/


  	/*getUser(userId: string) {
  		this.http.get<MyJsonData>('http://localhost:9003/batch', {observe: 'response'}).subscribe(resp => {
  			console.log("Test response ================== "+resp.body._embedded);
  			//return resp.body.username;
  		});
  	
  	}*/

  	private handleError(error: any) {
	    // In a real world app, we might use a remote logging infrastructure
	    // We'd also dig deeper into the error to get a better message
	    let errMsg = (error.message) ? error.message :
	        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
	    console.log(errMsg); // log to console instead
	    return Observable.throw(errMsg);
	}
}