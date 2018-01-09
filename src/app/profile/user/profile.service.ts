import { Injectable } from '@angular/core';

import { Profile, User, SchoolDetails } from './user.model';
import { Observable }     from 'rxjs/Observable';

import { RequestOptions, Headers, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { AuthenticationService } from '../../login/authentication.service';

import 'rxjs/add/operator/map';


@Injectable()    
export class ProfileService {
	private headers = new Headers({
     'Content-Type': 'application/json; charset=utf-8',
     'Accepts':'text/plain ; application/json',
     'Access-Control-Allow-Origin':'*',
     'Authorization': 'Bearer ' + this.authenticationService.getToken()
     });

	constructor(private http: Http, private authenticationService: AuthenticationService) { }
  	
	createUser(user: User): Promise<any> {
        return this.http
          .post("http://localhost:9004/users/sign-up", JSON.stringify(user), { headers: this.headers })
          .toPromise()
          .then(res => res.json() as User)
          .catch(this.handleError);  
	}
    
  saveUser(user: User): Promise<any> {
      return this.http
        .post("http://localhost:9004/users", JSON.stringify(user), { headers: this.headers })
        .toPromise()
        .then(res => res.json() as User)
        .catch(this.handleError);  
  }

  getUser(userId:string):Observable<User> {
      return this.http.get('http://localhost:9004/users/' + userId).map(res => res.json()).map((data: User) => {
      return data as User;
      });
  }

  saveSchoolDetails(schoolDetail: SchoolDetails): Promise<any> {
      return this.http
        .post("http://localhost:9004/schoolDetails", JSON.stringify(schoolDetail), { headers: this.headers })
        .toPromise()
        .then(res => res.json() as SchoolDetails)
        .catch(this.handleError);  
  }

  getSchoolDetails(userId:string):Observable<SchoolDetails> {
      return this.http.get('http://localhost:9004/schoolDetails/' + userId).map(res => res.json()).map((data: SchoolDetails) => {
      return data as SchoolDetails;
      });
  }

	private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }

}