import { Component, Input } from '@angular/core';
import { SchoolYear, Action} from './schoolyear.model';
import { SchoolYearService } from './schoolyear.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'schoolyear-app',
  templateUrl: './schoolyear.view.html'
})

export class SchoolYearComponent {
  message = '';
  model = new SchoolYear();
 
  action = new Action();
 
  schoolYears = new Array<SchoolYear>();
  
  submitted = false;

  constructor(private schoolYearService: SchoolYearService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { 
    let type = this.activatedRoute.snapshot.paramMap.get('action');
    console.log("Action");
    console.log(type);
    this.action.method = type;
    if (this.action.method == "View") {
      this.getAllSchoolYears();
    }
  }


  //this method will get Entity details. With that it will bring all addresses also. All org are fetched to display in select box. 
  onActionGet() {
    this.submitted = true; 
    this.model.entityId = 25;
    this.getOneSchoolYear();
    this.message = "Record retrieved......";
    this.action.submethod = 'View';
  }
  
  async getOneSchoolYear() {
    
    await this.schoolYearService.getSchoolYear(this.model).subscribe((data:SchoolYear) => {
    this.model = data;
    });
    

    //this is applicable only for View/Update/Delete mode.
    this.getAllSchoolYears();
  }

//This method gets all organization name from Eorg table. We have to filter this as per Type
  getAllSchoolYears() {
    this.schoolYearService.getSchoolYears(25).subscribe((data: Array<SchoolYear>) => {
            this.schoolYears = data;
    });
  }

//this method is called when create/update is selected. At the same time it will reinitialize all important object.
   createSchoolYear(){
     this.saveSchoolYear();
    
  }

  async saveSchoolYear() {
    
    this.submitted = true; 
    console.log(JSON.stringify(this.model));
    this.model.entityId = 25;
    await this.schoolYearService.createSchoolYear(this.model).then(result => this.model=result); 
    this.message = "Record saved successfully......";

    this.message = "Operation perfomed succesfully..."
  }
  
} 