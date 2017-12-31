import { Injectable } from '@angular/core';
import { Department, DepartmentParticulars } from './department.model';
import { Observable }     from 'rxjs/Observable';

import { RequestOptions, Headers, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'

import 'rxjs/add/operator/map';


@Injectable()
export class DepartmentService {
	private headers = new Headers({ 'Content-Type': 'application/json' });

	constructor(private http: Http) { }
  	
	createDepartment(department: Department): Promise<Department> {
        return this.http
          .post("http://localhost:9003/department", JSON.stringify(department), { headers: this.headers })
          .toPromise()
          .then(res => res.json() as Department)
          .catch(this.handleError);
	}
    
    getDepartment(department: Department):Observable<Department> {
        return this.http.get('http://localhost:9003/department/' + department.departmentId).map(res => res.json()).map((data: Department) => {
        console.log(data);
        return data as Department;
      });
    }

    getDepartments(entityId: Number, schoolYearId: Number):Observable<Array<Department>> {
        return this.http.get('http://localhost:9003/department/'+ entityId + "/" + schoolYearId).map(res => res.json()).map((data: Array<Department>) => {
        console.log(data);
        return data as Department[];
      });
    }

	private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}