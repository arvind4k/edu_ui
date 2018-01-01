import { Injectable } from '@angular/core';

import { Profile, User } from './user.model';
import { Observable }     from 'rxjs/Observable';

import { RequestOptions, Headers, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'

import 'rxjs/add/operator/map';


@Injectable()
export class ProfileService {
	private headers = new Headers({ 'Content-Type': 'application/json' });

	constructor(private http: Http) { }
  	
	createUser(user: User): Promise<any> {
        return this.http
          .post("http://localhost:9004/users/sign-up", JSON.stringify(user), { headers: this.headers })
          .toPromise()
          .then(res => res.json() as User)
          .catch(this.handleError);  
	}
    

  getUser(user: User):Observable<Profile> {
    return this.http.get('http://localhost:1900/user/' + user.userId).map(res => res.json()).map((data: Profile) => {
        return data as Profile;
      });
    }

	private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}