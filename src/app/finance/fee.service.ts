import { Injectable } from '@angular/core';

import { RequestOptions, Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FeeCategory, FeeBatchMapping, FeeParticular, Fine } from './fee.model';
import { Page } from '../common/common.model';
import { AuthenticationService } from '../login/authentication.service'

@Injectable()
export class FeeService {
    private headers = new Headers({
     'Content-Type': 'application/json; charset=utf-8',
     'Accepts':'text/plain ; application/json',
     'Access-Control-Allow-Origin':'*',
     'Authorization': 'Bearer ' + this.authenticationService.getToken()
     });
   
    constructor(
      private http: Http,
      private authenticationService: AuthenticationService) {
    }
      
    getFeeCategories():Observable<Array<FeeCategory>> {
        return this.http.get('http://localhost:9002/fee').map(res => res.json()).map((data: Array<FeeCategory>) => {
        return data as FeeCategory[];
      });
    }

    getFeeCategoryById(feeCategoryId:string):Observable<FeeCategory> {
        return this.http.get('http://localhost:9002/fee/'+feeCategoryId).map(res => res.json()).map((data: FeeCategory) => {
        return data as FeeCategory;
      });
    }

    getBatchesByFeeCategoryId(feeCategoryId:string):Observable<Array<FeeBatchMapping>> {
        return this.http.get('http://localhost:9002/fee/batches/'+feeCategoryId).
            map(res => res.json()).map((data: Array<FeeBatchMapping>) => {
            return data as FeeBatchMapping[];
        });
    }

    getFeeCategoriesByBatchId(batchId:string):Observable<Array<FeeCategory>> {
        console.log("headers ===== ",this.headers);
        return this.http.get('http://localhost:9002/fee/list/'+batchId).
            map(res => res.json()).map((data: Array<FeeCategory>) => {
            return data as FeeCategory[];
        });
    }

    getFeeParticulars(feeCategoryId:string, batchId: string):Observable<Array<FeeParticular>> {
        return this.http.get('http://localhost:9002/fee/particulars/'+feeCategoryId+'/'+batchId).
            map(res => res.json()).map((data: Array<FeeParticular>) => {
            return data as FeeParticular[];
        });
    }

    getFeeParticularById(particularId:string):Observable<FeeParticular> {
        return this.http.get('http://localhost:9002/fee/particulars/'+particularId).
            map(res => res.json()).map((data: FeeParticular) => {
            return data as FeeParticular;
        });
    }

    createFeeCategory(feeCategory: FeeCategory): Promise<any> {
        return this.http
          .post("http://localhost:9002/fee", JSON.stringify(feeCategory), { headers: this.headers })
          .toPromise()
          .then(res => res.json() as FeeCategory)
          .catch(this.handleError);
    }

    createFeeParticular(feeParticular: FeeParticular[]): Promise<any> {
        return this.http
          .post("http://localhost:9002/fee/particular", JSON.stringify(feeParticular), { headers: this.headers })
          .toPromise()
          .then(res => res.json())
          .catch(this.handleError);
    }

    getFeeCategoriesPaginated(page: Page): Promise<any> {
        return this.http
          .post("http://localhost:9002/fee/list", JSON.stringify(page), { headers: this.headers })
          .toPromise()
          .then(res => res.json())
          .catch(this.handleError);
    }

    saveFine(fine: Fine): Promise<any> {
        return this.http
          .post("http://localhost:9002/fee/fine", JSON.stringify(fine), { headers: this.headers })
          .toPromise()
          .then(res => res.json() as Fine)
          .catch(this.handleError);
    }

    getFines():Observable<Array<Fine>> {
        return this.http.get('http://localhost:9002/fee/fine').map(res => res.json()).map((data: Array<Fine>) => {
        return data as Fine[];
      });
    }
  
    getFineById(fineId:string):Observable<Fine> {
        return this.http.get('http://localhost:9002/fee/fine/'+fineId).
            map(res => res.json()).map((data: Fine) => {
            return data as Fine;
        });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}