import { Injectable } from '@angular/core';
import { UserRole, UserRoleParticulars } from './role.model';
import { Observable }     from 'rxjs/Observable';

import { RequestOptions, Headers, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'

import 'rxjs/add/operator/map';


@Injectable()
export class RoleService {
	private headers = new Headers({ 'Content-Type': 'application/json' });

	constructor(private http: Http) { }
  	
	createRole(role: UserRole): Promise<UserRole> {
        return this.http
          .post("http://localhost:9003/role", JSON.stringify(role), { headers: this.headers })
          .toPromise()
          .then(res => res.json() as UserRole)
          .catch(this.handleError);
	}
    
    getRole(role: UserRole):Observable<UserRole> {
        return this.http.get('http://localhost:9003/role/' + role.entityId + "/").map(res => res.json()).map((data: UserRole) => {
        console.log(data);
        return data as UserRole;
      });
    }

    getRoles(entityId: Number):Observable<Array<UserRole>> {
        return this.http.get('http://localhost:9003/role/' + entityId ).map(res => res.json()).map((data: Array<UserRole>) => {
        console.log(data);
        return data as UserRole[];
      });
    }

	private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}