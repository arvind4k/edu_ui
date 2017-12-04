import { Component } from '@angular/core';
import { FeeCategory, FeeBatchMapping } from './fee.model'
import { LABELS } from './labels'
import { Batch,PaymentFrequency } from '../common/common.model'
import { CommonService } from '../common/common.service'
import { FeeService } from './fee.service'
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fee-app',
    templateUrl: './fee.category.view.html'
})

export class FeeCategoryComponent {
    model = new FeeCategory();
    paymentFrequencies:PaymentFrequency[];
    batches: Batch[];
    batchMapping:Array<FeeBatchMapping>=[];
    submitted = false;
    feeCategory:FeeCategory;
    dueDay:Array<number>=[];

    constructor(
        private commonService: CommonService, 
        private feeService: FeeService, 
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.getAllBatches();
        this.getAllPaymentFrequencies();
        let id = parseInt(this.route.snapshot.paramMap.get('feeId'));    
        if(id>0){
            this.getFeeCategoryById(id.toString());
        }else{
            this.model.paymentFrequencyId="0";
            this.model.dueDate="15";
        }
        for(let i=0;i<30;i++){
            this.dueDay.push(i+1);
        }
    }

    getAllBatches() {
        this.commonService.getBatches().subscribe((data: Array<Batch>) => {
        this.batches = data;
        });
    }

    getAllPaymentFrequencies() {
        this.commonService.getPaymentFrequencies().subscribe((data: Array<PaymentFrequency>) => {
        this.paymentFrequencies = data;
        });
    }

    getFeeCategoryById(id: string) {
        this.feeService.getFeeCategoryById(id).subscribe((data: FeeCategory) => {
        this.model = data;
        for(let i=0;i<this.batches.length;i++){
            for(let j=0;j<this.model.feeBatchMapping.length;j++){
                if(this.model.feeBatchMapping[j].batchId==this.batches[i].batchId){
                    this.batches[i].checked="checked";    
                }
            }
        }
        });
    }

    async onSubmit() {
        this.submitted = true; 
        this.model.feeBatchMapping=this.batchMapping;
        await this.feeService.createFeeCategory(this.model).then(result => this.model=result); 
        this.router.navigate(['/feeParticular',this.model.feeCategoryId]);
    }
    
    checkedBatches(val:any) {
        if ((<HTMLInputElement>document.getElementById(val)).checked === true) {
            var feeBatchMapping = new FeeBatchMapping();
            feeBatchMapping.batchId=val;
            feeBatchMapping.batchName=(<HTMLInputElement>document.getElementById(val)).value;
            this.batchMapping.push(feeBatchMapping);
        }
        else if ((<HTMLInputElement>document.getElementById(val)).checked === false) {
            let indexx = this.batchMapping.indexOf(val);
            this.batchMapping.splice(indexx,1)
        }
    }
}