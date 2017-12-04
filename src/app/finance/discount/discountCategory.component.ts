import { Component } from '@angular/core';
import { DiscountCategory } from './discount.model'
import { DiscountService } from './discount.service'
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'dis-cat-app',
    templateUrl: './disCategory.view.html'
})

export class DiscountCategoryComponent {
    model = new DiscountCategory();
    submitted = false;
    discountCategoryId: string;

    constructor(
        private discountService: DiscountService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.discountCategoryId=this.route.snapshot.paramMap.get('discountCategoryId');
        if(Number(this.discountCategoryId)>0){
            this.getDiscountCategoryById();
        }
    }

    getDiscountCategoryById(){
        this.discountService.getDiscountCategoryById(this.discountCategoryId).subscribe((data: DiscountCategory) => {
        this.model = data;
        });
    }

    async onSubmit() {
        await this.discountService.createDiscountCategory(this.model).then(result => this.model=result); 
        this.submitted = true; 
    }
}