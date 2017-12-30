import { Component, Input } from '@angular/core';
import { Department, DepartmentParticulars, Action} from './department.model';
import { DepartmentService } from './department.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'department-app',
  templateUrl: './department.view.html'
})
export class DepartmentComponent {
 
  departmentParticulars: Array<DepartmentParticulars>;
  departments: Array<Department>;

  model: DepartmentParticulars;
  formModel: DepartmentParticulars;
  department: Department;

  count: number;
  editArrayPosition: number;
  action: Action;


  constructor(private transportService: DepartmentService, private router: Router, private activatedRoute: ActivatedRoute) {  
  
  }
  ngOnInit(): void {
    let type = this.activatedRoute.snapshot.paramMap.get('action');
    console.log("Action");
    console.log(type);

    this.departmentParticulars = new Array<DepartmentParticulars>();
    this.formModel = new DepartmentParticulars();
    this.department = new Department();
    this.departments = new Array<Department>();

    this.count = 1;
    this.editArrayPosition = 0;
    this.action = new Action();
    this.action.method = type;
  }
  
  addSubject(subjectName: string, subSubjectName: string){
   
    this.model = new DepartmentParticulars();
    this.model.subjectName = subjectName;
    this.model.subSubjectName = subSubjectName;
    
    this.model.obsolete = '0';
    this.departmentParticulars.push(this.model);
    this.count = this.count + 1;
    this.formModel.subjectName ='';
    this.formModel.subSubjectName ='';
  }
  editSubject(subjectName: string, subSubjectName: string){
    
    
    this.departmentParticulars[this.editArrayPosition].subjectName = subjectName;
    this.departmentParticulars[this.editArrayPosition].subSubjectName = subSubjectName;

     this.formModel.subjectName ='';
     this.formModel.subSubjectName ='';
     //this.action.method = 'Create';
     this.action.submethod = 'Add';
   }
  
  actionEdit(toEdit: number, subjectName: string, subSubjectName: string){
    this.action.submethod = "Edit";
    //this.action.method = "";
    //below assignment will cause value to go empty hence update should be displayed
    //this.formModel.stopNumber = toEdit;
    this.formModel.subjectName = subjectName;
    this.formModel.subSubjectName = subSubjectName;
    this.editArrayPosition = toEdit - 1;
  }

  async onSubmit(){
    this.department.obsolete = '0';
    this.department.departmentParticulars = this.departmentParticulars;
    console.log(JSON.stringify(this.department));
    await this.transportService.createDepartment(this.department).then(result => this.department=result); 
  }
  getRoutes(){
    this.transportService.getDepartments().subscribe((data: Array<Department>) => {
      this.departments = data;
      });
  }
  onSelectRoute(){
    console.log(this.count);
    this.department.departmentName = this.departments[this.count].departmentName;
    this.department.departmentId = this.departments[this.count].departmentId;
    this.department.departmentParticulars = this.departments[this.count].departmentParticulars;
    
    this.departmentParticulars = this.departments[this.count].departmentParticulars;
  }
} 


export class KeyUpComponent_v4 {
  value = '';
  update(value: string) { this.value = value; }
}

