import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Fine, FineSlab } from './fee.model';
import { FeeService } from './fee.service';


@Component({
    selector: 'fine-app',
    templateUrl: './fine.view.html'
})

export class FineComponent {
    model=new Fine();
    fineSlabs:Array<FineSlab>=[];
    fines: Array<Fine>=[];
    submitted = false;

    constructor(
        private feeService: FeeService,
    ) { }

    ngOnInit(): void {
        this.model.fineId="0";
        this.getAllFines();
        this.fineSlabs.push(new FineSlab());
    }

    addSlab(){
        console.log(this.fineSlabs);
        this.fineSlabs.push(new FineSlab());
    }

    getAllFines() {
        this.feeService.getFines().subscribe((data: Array<Fine>) => {
        this.fines = data;
        });
    }

    getFineById() {
        this.feeService.getFineById(this.model.fineId).subscribe((data: Fine) => {
        this.model = data;
        console.log(this.model);
        });
    }
    async onSubmit() {
        this.model.fineSlabs=this.fineSlabs;
        
        console.log(JSON.stringify(this.model));
        await this.feeService.saveFine(this.model).then(result => this.model=result); 
        this.submitted = true; 
        console.log("fine id =======",this.model.fineId);
        
        
    }
}