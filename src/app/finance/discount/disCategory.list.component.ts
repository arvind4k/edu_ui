import { Component } from '@angular/core';
import { DiscountCategory } from './discount.model'
import { DiscountService } from './discount.service'
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'dis-cat-list-app',
    templateUrl: './disCategoryList.view.html'
})

export class DiscountCategoryListComponent {
    discountCategories:Array<DiscountCategory>=[];
    submitted = false;
    status:any;

    constructor(
        private discountService: DiscountService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.getDiscountCategories();
    }

    getDiscountCategories(){
        this.discountService.getDiscountCategories().subscribe((data: Array<DiscountCategory>) => {
        this.discountCategories = data;
        });
    }

    redirectToDiscountCategory(discountCategoryId:string){
        this.router.navigate(['/discount/category',discountCategoryId]);
    }

    /*async deleteDiscountCategory(discountCategoryId:string){
        await this.discountService.deleteDiscountCategory(discountCategoryId).then(result => this.status=result);
        console.log("status ========== "+this.status);
    }*/
}