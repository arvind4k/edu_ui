import { Injectable } from '@angular/core';
import { SchoolYear } from './schoolyear.model';
import { Observable }     from 'rxjs/Observable';

import { RequestOptions, Headers, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'

import 'rxjs/add/operator/map';


@Injectable()
export class SchoolYearService {
	private headers = new Headers({ 'Content-Type': 'application/json' });

	constructor(private http: Http) { }
  	
	createSchoolYear(entity: SchoolYear): Promise<SchoolYear> {
        return this.http
          .post("http://localhost:9003/schoolyear", JSON.stringify(entity), { headers: this.headers })
          .toPromise()
          .then(res => res.json() as SchoolYear)
          .catch(this.handleError);
	}
    
    getSchoolYear(schoolYear: SchoolYear):Observable<SchoolYear> {
        return this.http.get('http://localhost:9003/schoolyear/' + schoolYear.entityId + "/" + schoolYear.schoolYearId).map(res => res.json()).map((data: SchoolYear) => {
        console.log(data);
        return data as SchoolYear;
      });
    }

    getSchoolYears(entityId: Number):Observable<Array<SchoolYear>> {
        return this.http.get('http://localhost:9003/schoolyear/' + entityId).map(res => res.json()).map((data: Array<SchoolYear>) => {
        console.log(data);
        return data as SchoolYear[];
      });
    }

	private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}