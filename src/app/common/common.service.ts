import { Injectable } from '@angular/core';


import { RequestOptions, Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Batch, PaymentFrequency, StudentCategory, Relation } from './common.model';
import { STUDENT_CATEGORIES, RELATIONSHIP, RELIGIONS, COUNTRIES } from './data';


@Injectable()
export class CommonService {

    constructor(private http: Http) { }
    
    getBatches():Observable<Array<Batch>> {
        return this.http.get('http://localhost:9003/batch').map(res => res.json()).map((data: Array<Batch>) => {
        return data["_embedded"].batch as Batch[];
      });
    }
    
    getPaymentFrequencies():Observable<Array<PaymentFrequency>> {
        return this.http.get('http://localhost:9002/frequencies').map(res => res.json()).map((data: Array<PaymentFrequency>) => {
        return data["_embedded"].frequencies as PaymentFrequency[];
      });
    }

    getPaymentFrequencyById(paymentFrequencyId:string):Observable<PaymentFrequency> {
        return this.http.get('http://localhost:9002/frequencies/search/findByPaymentFrequencyId/?paymentFrequencyId='+paymentFrequencyId).map(res => res.json()).map((data: PaymentFrequency) => {
        return data as PaymentFrequency;
      });
    }

    getStudentCategories(): Array<StudentCategory> {
        return STUDENT_CATEGORIES;
    }

    getRelationshipDesc(relationId: string): string{
        var relationshipDesc='';
        for(let i=0;i<RELATIONSHIP.length;i++){
            var obj = RELATIONSHIP[i];
            if (relationId === obj.code) {
                relationshipDesc = obj.name;
            }
        }
        return relationshipDesc;
    }

    getCountryName(countryId: string): string{
        var countryName='';
        for(let i=0;i<COUNTRIES.length;i++){
            var obj = COUNTRIES[i];
            if (countryId === obj.alpha3_code) {
                countryName = obj.name;
            }
        }
        return countryName;
    }

    private handleError(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }
}