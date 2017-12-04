import { Injectable } from '@angular/core';

import { RequestOptions, Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DiscountCategory,Discount } from './discount.model';

@Injectable()
export class DiscountService {
    private headers = new Headers({'Accepts':'text/plain ; application/json', 'Content-type':'Application/json; charset=utf-8', 'Access-Control-Allow-Origin':'*'});
   
    constructor(private http: Http) { }
      
    getDiscountCategories():Observable<Array<DiscountCategory>> {
        return this.http.get('http://localhost:9002/discountCategory').map(res => res.json()).map((data: Array<DiscountCategory>) => {
        return data["_embedded"].discountCategory as DiscountCategory[];
      });
    }

    getDiscountCategoryById(discountCategoryId:string):Observable<DiscountCategory> {
        return this.http.get('http://localhost:9002/discountCategory/'+discountCategoryId).map(res => res.json()).map((data: DiscountCategory) => {
        return data as DiscountCategory;
      });
    }
   
    createDiscountCategory(discountCategory: DiscountCategory): Promise<any> {
        return this.http
          .post("http://localhost:9002/discountCategory", JSON.stringify(discountCategory), { headers: this.headers })
          .toPromise()
          .then(res => res.json() as DiscountCategory)
          .catch(this.handleError);
    }

    deleteDiscountCategory(discountCategoryId: string): void/*Promise<any>*/{
        /*return this.http.delete('http://localhost:9002/discountCategory/'+discountCategoryId, this.headers).then  
        (success => success.status);*/
    }

    getDiscounts():Observable<Array<Discount>> {
        return this.http.get('http://localhost:9002/discount').map(res => res.json()).map((data: Array<Discount>) => {
        return data["_embedded"].discount as Discount[];
      });
    }

    getValidDiscounts():Observable<Array<Discount>> {
        return this.http.get('http://localhost:9002/discount/search/findValidDiscounts').map(res => res.json()).map((data: Array<Discount>) => {
        return data["_embedded"].discount as Discount[];
      });
    }

    getDiscountsByFeeIdAndBatchId(feeId:string,batchId:string):Observable<Array<Discount>> {
        return this.http.get('http://localhost:9002/discount/search/findDiscountsByFeeIdAndBatchId/?feeId='+feeId+'&batchId='+batchId).map(res => res.json()).map((data: Array<Discount>) => {
        return data["_embedded"].discount as Discount[];
      });
    }

    getDiscountById(discountId: string):Observable<Discount> {
        return this.http.get('http://localhost:9002/discount/'+discountId).map(res => res.json()).map((data: Discount) => {
        return data as Discount;
      });
    }
    
    saveOrUpdateDiscount(discount: Discount): Promise<any> {
        return this.http
          .post("http://localhost:9002/discount", JSON.stringify(discount), { headers: this.headers })
          .toPromise()
          .then(res => res.json())
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}