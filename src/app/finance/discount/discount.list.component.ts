import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DiscountCategory, Discount } from './discount.model'
import { DiscountService } from './discount.service'
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'dis-list-app',
    templateUrl: './discountList.view.html'
})

export class DiscountListComponent {
    discounts:Array<Discount>=[];
    submitted = false;
    status:any;
    discount:Discount;

    constructor(
        private discountService: DiscountService,
        private router: Router,
        private route: ActivatedRoute,
        private datePipe: DatePipe
    ) { }

    ngOnInit(): void {
        this.getDiscounts();
    }

    getDiscounts(){
        this.discountService.getValidDiscounts().subscribe((data: Array<Discount>) => {
        this.discounts = data;
        });
    }

    redirectToDiscountView(discountId:string){
        this.router.navigate(['/discount',discountId]);
    }

    async deleteDiscount(discountId: string){
        await this.discountService.getDiscountById(discountId).subscribe((data: Discount) => {
        this.discount = data;
        this.discount.updationDate=this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
        this.discount.obsolete="1";
        this.setObsolete(this.discount);
        });
    }

    async setObsolete(discount:Discount){
        await this.discountService.saveOrUpdateDiscount(this.discount).then(result => this.discount=result);
        this.getDiscounts();
    }
}