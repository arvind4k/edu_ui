import { Injectable } from '@angular/core';
import { Transport, TransportParticulars } from './transport.model';
import { Observable }     from 'rxjs/Observable';

import { RequestOptions, Headers, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'

import 'rxjs/add/operator/map';


@Injectable()
export class TransportService {
	private headers = new Headers({ 'Content-Type': 'application/json' });

	constructor(private http: Http) { }
  	
	createTransport(transport: Transport): Promise<Transport> {
        return this.http
          .post("http://localhost:9003/transport", JSON.stringify(transport), { headers: this.headers })
          .toPromise()
          .then(res => res.json() as Transport)
          .catch(this.handleError);
	}
    
    getTransport(transport: Transport):Observable<Transport> {
        return this.http.get('http://localhost:9003/transport/' + transport.entityId + "/" + transport.routeId).map(res => res.json()).map((data: Transport) => {
        console.log(data);
        return data as Transport;
      });
    }

    getTransports(entityId: Number):Observable<Array<Transport>> {
        return this.http.get('http://localhost:9003/transport/' + entityId ).map(res => res.json()).map((data: Array<Transport>) => {
        console.log(data);
        return data as Transport[];
      });
    }

	private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}