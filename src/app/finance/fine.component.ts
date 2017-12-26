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
    fines: Array<Fine>=[];
    submitted = false;

    constructor(
        private feeService: FeeService,
    ) { }

    ngOnInit(): void {
        this.model.fineId="0";
        this.model.fineSlabs.push(new FineSlab());
        this.getAllFines();
    }

    addSlab(){
        this.model.fineSlabs.push(new FineSlab());
    }

    getAllFines() {
        this.feeService.getFines().subscribe((data: Array<Fine>) => {
        this.fines = data;
        });
    }

    getFineById() {
        this.feeService.getFineById(this.model.fineId).subscribe((data: Fine) => {
        this.model = data;
        });
    }
    async onSubmit() {
        await this.feeService.saveFine(this.model).then(result => this.model=result); 
        this.submitted = true; 
    }
}