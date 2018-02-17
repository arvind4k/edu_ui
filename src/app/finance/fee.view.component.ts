import { Component } from '@angular/core';
import { LABELS } from './labels'
import { FeeCategory, FeeParticular } from './fee.model';
import { CourseService } from '../admin/course/course.service'
import { Course } from '../admin/course/course.model'
import { PaymentFrequency } from '../common/common.model'
import { FeeService } from './fee.service'
import { DiscountService } from './discount/discount.service'
import { Discount } from './discount/discount.model'
import { CommonService } from '../common/common.service';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fee-app',
    templateUrl: './fee.view.html'
})

export class FeeViewComponent {
    feeCategory= new FeeCategory();
    feeParticulars: Array<FeeParticular>=[new FeeParticular()];
    batchId: string;
    feeCategoryId: string;
    paymentFrequency= new PaymentFrequency();
    discounts:Array<Discount>=[];


   constructor(
        private commonService: CommonService, 
        private feeService: FeeService, 
        private router: Router,
        private route: ActivatedRoute,
        private discountService: DiscountService,
    ) { }

    ngOnInit(): void {
        this.batchId="0";
        this.feeCategoryId=this.route.snapshot.paramMap.get('feeId');
        this.batchId=this.route.snapshot.paramMap.get('batchId');
        this.getParticularList();
        this.getFeeCategory();
        this.getDiscountList();
    }

    async getParticularList() {
        await this.feeService.getFeeParticulars(this.feeCategoryId,this.batchId).subscribe((data: Array<FeeParticular>) => {
        this.feeParticulars = data;
        });
    }

    async getFeeCategory() {
        await this.feeService.getFeeCategoryById(this.feeCategoryId).subscribe((data: FeeCategory) => {
            this.feeCategory = data;
            this.getPaymentFrequency();
        });
    }

    async getDiscountList() {
        await this.discountService.getDiscountsByFeeIdAndBatchId(this.feeCategoryId,this.batchId).subscribe((data: Array<Discount>) => {
        this.discounts = data;
        });
    }

    getPaymentFrequency() {
        this.commonService.getPaymentFrequencyById(this.feeCategory.paymentFrequencyId).subscribe((data: PaymentFrequency) => {
            this.paymentFrequency = data;
        });
    }

    backToFeeList(){
        this.router.navigate(['/feeList',this.batchId]);
    }

    getTotal() {
        let total = 0;
        for (var i = 0; i < this.feeParticulars.length; i++) {
            if (this.feeParticulars[i].amount) {
                total += (Number(this.feeParticulars[i].amount)*(Number(this.feeParticulars[i].numberOfMonths)/Number(this.feeParticulars[i].inputAsMonth)))
            }
        }
        return total;
    }
}