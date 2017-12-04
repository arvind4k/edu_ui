import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { LABELS } from './labels'
import { FeeCategory, FeeParticular } from './fee.model';

import { Batch } from '../common/common.model'
import { FeeService } from './fee.service'
import { CommonService } from '../common/common.service';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'particular-list-app',
    templateUrl: './particularList.view.html'
})

export class FeeParticularListComponent {
    batches: Batch[];
    feeParticulars:Array<FeeParticular>=[];
    batchId: string;
    feeCategoryId: string;
    previousUrl:string;

    constructor(
        private commonService: CommonService, 
        private feeService: FeeService, 
        private router: Router,
        private route: ActivatedRoute,
        private _location: Location,
    ) { }

    ngOnInit(): void {
        this.getAllBatches();
        this.feeCategoryId=this.route.snapshot.paramMap.get('feeId');
        this.batchId=this.route.snapshot.paramMap.get('batchId');
        this.getParticularList();
    }

    //Fetch all batches
    getAllBatches() {
        this.commonService.getBatches().subscribe((data: Array<Batch>) => {
        this.batches = data;
        });
    }

    getParticularList() {
        this.feeService.getFeeParticulars(this.feeCategoryId,this.batchId).subscribe((data: Array<FeeParticular>) => {
        this.feeParticulars = data;
        });
    }

    redirectToFeeParticular(feeParticularId:string){
        this.router.navigate(['/feeParticular/edit',feeParticularId]);
    }

    backClicked() {
        this.router.navigate(['/feeList',this.batchId]);
    }
}