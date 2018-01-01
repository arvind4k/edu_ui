import { Component, Input } from '@angular/core';
import { Course, CourseParticulars, Action} from './course.model';
import { CourseService } from './course.service';

import { Department, DepartmentParticulars} from '../department/department.model';
import { DepartmentService } from '../department/department.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'course-app',
  templateUrl: './course.view.html'
})
export class CourseComponent {
 
  courseParticulars: Array<CourseParticulars>;
  courses: Array<Course>;
  departments: Array<Department>;
  department: Department;
  
  departmentParticulars: Array<DepartmentParticulars>;

  model: Department;
  formModel: Array<Department>;

  course: Course;

  count: number;
  editArrayPosition: number;
  action: Action;

  depPos: number;
  subPos: number;

  constructor(private courseService: CourseService, private departmentService: DepartmentService, private router: Router, private activatedRoute: ActivatedRoute) {  
  
  }
  ngOnInit(): void {
    let type = this.activatedRoute.snapshot.paramMap.get('action');
    console.log("Action");
    console.log(type);

    
    this.formModel = new Array<Department>();

    this.courseParticulars = new Array<CourseParticulars>();
    //this.formModel = new CourseParticulars();
    this.course = new Course();
    this.courses = new Array<Course>();
    
    this.departments = new Array<Department>();
    this.department = new Department();
    this.departmentParticulars = new Array<DepartmentParticulars>();

    this.count = 0;
    this.depPos = 0;
    this.subPos = 0;

    this.editArrayPosition = 0;
    this.action = new Action();
    this.action.method = type;

    if (this.action.method == "Create") {
      this.getDepartments();
      //this.model = new Department();
      //this.formModel.push(this.model);
    }

  }
  
  getDepartments(){
    this.departmentService.getDepartments(25,2).subscribe((data: Array<Department>) => {
      this.departments = data;
      });
  }

  onSelectDepartment(){
    //this.department=null;
    this.department = this.departments[this.depPos];
    this.departmentParticulars = this.departments[this.depPos].departmentParticulars;
  }

  onSelectSubject(){
    
  }

  addSubject(){
    this.model = new Department();
    this.model.departmentId = this.department.departmentId;
    this.model.departmentName = this.department.departmentName;
    this.model.departmentParticulars = new Array<DepartmentParticulars>();
    this.model.departmentParticulars.push(this.departmentParticulars[this.subPos]);
    //this.model.departmentParticulars[0] = this.departmentParticulars[this.subPos];
    /*model.departmentParticulars[0].subjectId = this.departmentParticulars[this.subPos].subjectId;
    model.departmentParticulars[0].subjectName = this.departmentParticulars[this.subPos].subjectName;
    model.departmentParticulars[0].subSubjectName = this.departmentParticulars[this.subPos].subSubjectName;*/

    this.formModel.push(this.model);
    console.log("Model Value..");
    console.log(this.model);
    console.log("FormModel Value..");
    console.log(this.formModel);
  }

  editSubject(departmentId: string, subjectId: string){
    
    
    this.courseParticulars[this.editArrayPosition].departmentId = departmentId;
    this.courseParticulars[this.editArrayPosition].subjectId = subjectId;

    
     //this.action.method = 'Create';
     this.action.submethod = 'Add';
   }
  
  actionEdit(toEdit: number, departmentId: string, subjectId: string){
    this.action.submethod = "Edit";
    //this.action.method = "";
    //below assignment will cause value to go empty hence update should be displayed
    //this.formModel.stopNumber = toEdit;
    //this.formModel.departmentId = departmentId;
    //this.formModel.subjectId = subjectId;
    this.editArrayPosition = toEdit - 1;
  }

  async onSubmit(){
    this.course.obsolete = '0';
    this.course.courseParticulars = this.courseParticulars;
    console.log(JSON.stringify(this.course));
    await this.courseService.createCourse(this.course).then(result => this.course=result); 
  }
  getRoutes(){
    this.courseService.getCourses().subscribe((data: Array<Course>) => {
      this.courses = data;
      });
  }
  onSelectRoute(){
    console.log(this.count);
    this.course.courseName = this.courses[this.count].courseName;
    this.course.courseId = this.courses[this.count].courseId;
    this.course.courseParticulars = this.courses[this.count].courseParticulars;
    
    this.courseParticulars = this.courses[this.count].courseParticulars;
  }
} 


export class KeyUpComponent_v4 {
  value = '';
  update(value: string) { this.value = value; }
}

