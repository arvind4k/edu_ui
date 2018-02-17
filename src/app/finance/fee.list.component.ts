import { Component } from '@angular/core';
import { LABELS } from './labels'
import { FeeCategory } from './fee.model';

import { CourseService } from '../admin/course/course.service'
import { Course } from '../admin/course/course.model'

import { FeeService } from './fee.service'
import { CommonService } from '../common/common.service';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fee-app',
    templateUrl: './feeList.view.html'
})

export class FeeListComponent {
    courses:Array<Course>=[];
    feeList:Array<FeeCategory>=[];
    batchId: string;

    constructor(
        private commonService: CommonService, 
        private feeService: FeeService, 
        private router: Router,
        private route: ActivatedRoute,
        private courseService: CourseService,
    ) { }

    ngOnInit(): void {
        this.getCourses();
        let id=this.route.snapshot.paramMap.get('id');
        this.batchId=id;
        if(id=="0"){
           this.feeList=null; 
        }else{
           this.getFeeList();
        }
    }

    //Fetch all cpourses
    getCourses(){
    this.courseService.getCourses(25,2).subscribe((data: Array<Course>) => {
      this.courses = data;
      });
    }

    getFeeList() {
        this.feeService.getFeeCategoriesByBatchId(this.batchId).subscribe((data: Array<FeeCategory>) => {
        this.feeList = data;
        });
    }

    redirectToFeeCategory(feeId:string){
        this.router.navigate(['/feeCategory',feeId]);
    }

    redirectToFeeParticulars(feeId:string){
        this.router.navigate(['/particularList',feeId,this.batchId]);
    }

    redirectToFeeView(feeId:string,batchId: string){
        this.router.navigate(['/feeView',feeId,this.batchId]);
    }
}