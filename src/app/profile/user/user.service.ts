import { Injectable } from '@angular/core';

import { User } from './user.model';
import { Observable }     from 'rxjs/Observable';

import { RequestOptions, Headers, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'

import 'rxjs/add/operator/map';


@Injectable()
export class UserService {
	private headers = new Headers({ 'Content-Type': 'application/json' });

	constructor(private http: Http) { }
  	
	createUser(user: User): Promise<User> {
        return this.http
          .post("http://localhost:9004/users", JSON.stringify(user), { headers: this.headers })
          .toPromise()
          .then(res => res.json() as User)
          .catch(this.handleError);
	}
    
    getUser(user: User):Observable<User> {
        return this.http.get('http://localhost:9004/users/' + user.userId).map(res => res.json()).map((data: User) => {
        console.log(data);
        return data as User;
      });
    }

	private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}