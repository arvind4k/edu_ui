import { Injectable } from '@angular/core';
//import { COUNTRIES } from '../common/data';
//import { Country } from '../common/common.model';
import { Eorg } from './eorg.model';
import { Observable }     from 'rxjs/Observable';

import { RequestOptions, Headers, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'

import 'rxjs/add/operator/map';


@Injectable()
export class EorgService {
	private headers = new Headers({ 'Content-Type': 'application/json' });

	constructor(private http: Http) { }
  	
	createEorg(entity: Eorg): Promise<Eorg> {
        return this.http
          .post("http://localhost:9004/eorg", JSON.stringify(entity), { headers: this.headers })
          .toPromise()
          .then(res => res.json() as Eorg)
          .catch(this.handleError);
	}
    
    getEorg(entity: Eorg):Observable<Eorg> {
        return this.http.get('http://localhost:9004/eorg/' + entity.entityId).map(res => res.json()).map((data: Eorg) => {
        console.log(data);
        return data as Eorg;
      });
    }

    getEorgs():Observable<Array<Eorg>> {
        return this.http.get('http://localhost:9004/eorg').map(res => res.json()).map((data: Array<Eorg>) => {
        console.log(data);
        return data["_embedded"].eorg as Eorg[];
      });
    }

	private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}