import { Component, Input } from '@angular/core';
import { FeeCategory, FeeBatchMapping, FeeParticular } from './fee.model'
import { Batch,PaymentFrequency } from '../common/common.model'
import { CommonService } from '../common/common.service'
import { FeeService } from './fee.service'
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fee-particular-app',
    templateUrl: './fee.particular.view.html',
})

export class FeeParticularComponent {
    model = new FeeParticular();
    feeParticulars:Array<FeeParticular>=[];
    feeCategories:FeeCategory[];
    batchMappings:FeeBatchMapping[];
    submitted = false;
    paymentFrequency=new PaymentFrequency();
    feeCategory:FeeCategory;

    constructor(
        private commonService: CommonService, 
        private feeService: FeeService, 
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getAllFeeCategories();
        let particularId = this.route.snapshot.paramMap.get('particualrId');
        let id = this.route.snapshot.paramMap.get('feeId');
        
        if(particularId){
            this.getFeeParticularById(particularId);
        }
 
        if(id){
            this.model.feeCategoryId=id;
            this.getBatchesByFeeCategoryId(this.model.feeCategoryId);
        }
        this.getFeeCategory();
    }

    getFeeParticularById(particularId: string) {
        this.feeService.getFeeParticularById(particularId).subscribe((data: FeeParticular) => {
            this.model = data;
        });
    }

    //Fetch all fee category
    getAllFeeCategories() {
        this.feeService.getFeeCategories().subscribe((data: Array<FeeCategory>) => {
            this.feeCategories = data;
        });
    }
    
    async getFeeCategory() {
        await this.feeService.getFeeCategoryById(this.model.feeCategoryId).subscribe((data: FeeCategory) => {
            this.feeCategory = data;
            this.getPaymentFrequency(data.paymentFrequencyId);
            console.log('frequency=============='+this.paymentFrequency);
        });
    }

    getBatchesByFeeCategoryId(feeCategoryId: string){
        if(feeCategoryId==null){
            this.model.feeCategoryId=(<HTMLInputElement>document.getElementById('feeCategoryId')).value
        }
        this.feeService.getBatchesByFeeCategoryId(this.model.feeCategoryId).subscribe((data: Array<FeeBatchMapping>) => {
            this.batchMappings = data;
        });
    }
    
    getPaymentFrequency(paymentFrequencyId:string) {
        this.commonService.getPaymentFrequencyById(this.model.feeCategoryId).subscribe((data: PaymentFrequency) => {
            this.paymentFrequency = data;
        });
    }

    checkedBatches(val:any) {
        if ((<HTMLInputElement>document.getElementById(val)).checked == true) {
            var feeParticular = new FeeParticular();
            feeParticular.feeCategoryId=this.model.feeCategoryId;
            feeParticular.amount=this.model.amount;
            feeParticular.description=this.model.description;
            feeParticular.name=this.model.name;
            feeParticular.particularId=this.model.particularId;
            feeParticular.batchId=val;
            feeParticular.batchName=(<HTMLInputElement>document.getElementById(val)).value;
            this.feeParticulars.push(feeParticular);
        }
        else if ((<HTMLInputElement>document.getElementById(val)).checked === false) {
            let indexx = this.feeParticulars.indexOf(val);
            this.feeParticulars.splice(indexx,1);
        }
    }

    onSubmit() {
        this.submitted = true;
        if(this.model.particularId){
            this.feeParticulars.push(this.model);
        }else{
            for(let i=0;i<this.batchMappings.length;i++){
                this.checkedBatches(this.batchMappings[i].batchId);
            }
        }
        
        this.feeService.createFeeParticular(this.feeParticulars);
        if(this.model.particularId){
            this.router.navigate(['/particularList',this.model.feeCategoryId,this.model.batchId]);
        }else{
            this.reset();    
        }
    }

    private reset() {
       this.model.name = null;
       this.model.description = null;
       this.model.amount = null;
       this.model.batchName=null;
       this.model.batchId=null;
       this.model.particularId=null;
   }
}