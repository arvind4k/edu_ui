import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DiscountCategory, Discount } from './discount.model'
import { Batch, StudentCategory } from '../../common/common.model'
import { FeeService } from '../fee.service'
import { FeeCategory, FeeParticular } from '../fee.model'
import { CommonService } from '../../common/common.service';
import { DiscountService } from './discount.service'
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'discount-app',
    templateUrl: './discount.view.html'
})

export class DiscountComponent {
    model = new Discount();
    submitted = false;
    discountId: string;
    discountCategories: Array<DiscountCategory>=[];
    batches:Array<Batch>=[];
    feeCategories:Array<FeeCategory>=[];
    feeParticulars: Array<FeeParticular>=[];
    studentCategories: Array<StudentCategory>=[];

    constructor(
        private discountService: DiscountService,
        private commonService: CommonService,
        private feeService: FeeService,
        private router: Router,
        private route: ActivatedRoute,
        private datePipe: DatePipe
    ) { }

    ngOnInit(): void {
        this.getDiscountCategories();
        this.getAllBatches();
        this.model.discountCategoryId="0";
        this.model.batchId="0";
        this.model.feeCategoryId="0";
        this.model.appliedOn="0";
        this.model.studentCategoryId="0";
        this.discountId=this.route.snapshot.paramMap.get('discountId');
        if(Number(this.discountId)>0){
            this.getDiscountById();
        }
    }

    getDiscountCategories(){
        this.discountService.getDiscountCategories().subscribe((data: Array<DiscountCategory>) => {
        this.discountCategories = data;
        });
    }

    getAllBatches() {
        this.commonService.getBatches().subscribe((data: Array<Batch>) => {
        this.batches = data;
        });
    }

    getFeeList() {
        this.feeService.getFeeCategoriesByBatchId(this.model.batchId).subscribe((data: Array<FeeCategory>) => {
        this.feeCategories = data;
        });
    }

    async getDiscountById(){
        await this.discountService.getDiscountById(this.discountId).subscribe((data: Discount) => {
        this.model = data;
        console.log(this.model);
        this.getFeeList();
        this.getFeeParticularList();
        this.getStudentCategories();
        });
    }

    getFeeParticularList() {
        this.feeService.getFeeParticulars(this.model.feeCategoryId,this.model.batchId).subscribe((data: Array<FeeParticular>) => {
        this.feeParticulars = data;
        });
    }

    getStudentCategories(){
        console.log(this.model.discountCategoryId);
        if(this.model.discountCategoryId=='Category.STUDENT_CATEGORY'){
            this.studentCategories=this.commonService.getStudentCategories();
        }
    }

    async onSubmit() {
        this.model.updationDate=this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
        if(!this.model.discountId){
            this.model.creationDate=this.datePipe.transform(Date.now(), 'yyyy-MM-dd'); 
        }
        this.model.obsolete="0";
        console.log("model = ",JSON.stringify(this.model));
        await this.discountService.saveOrUpdateDiscount(this.model).then(result => this.model=result); 
        this.submitted = true; 
    }
}