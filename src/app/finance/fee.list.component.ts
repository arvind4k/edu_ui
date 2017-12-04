import { Component } from '@angular/core';
import { LABELS } from './labels'
import { FeeCategory } from './fee.model';

import { Batch } from '../common/common.model'
import { FeeService } from './fee.service'
import { CommonService } from '../common/common.service';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fee-app',
    templateUrl: './feeList.view.html'
})

export class FeeListComponent {
    batches: Batch[];
    feeList:Array<FeeCategory>=[];
    batchId: string;

    constructor(
        private commonService: CommonService, 
        private feeService: FeeService, 
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.getAllBatches();
        let id=this.route.snapshot.paramMap.get('id');
        this.batchId=id;
        if(id=="0"){
           this.feeList=null; 
        }else{
           this.getFeeList();
        }
    }

    //Fetch all batches
    getAllBatches() {
        this.commonService.getBatches().subscribe((data: Array<Batch>) => {
        this.batches = data;
        });
    }

    getFeeList() {
        this.feeService.getFeeCategoriesByBatchId(this.batchId).subscribe((data: Array<FeeCategory>) => {
        this.feeList = data;
        });
    }

    redirectToFeeCategory(feeId:string){
        console.log('feeId================'+feeId);
        this.router.navigate(['/feeCategory',feeId]);
    }

    redirectToFeeParticulars(feeId:string){
        this.router.navigate(['/particularList',feeId,this.batchId]);
    }

    redirectToFeeView(feeId:string,batchId: string){
        this.router.navigate(['/feeView',feeId,this.batchId]);
    }
}