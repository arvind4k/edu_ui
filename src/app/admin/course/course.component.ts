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
  courseParticular: CourseParticulars;

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
    this.courseParticular = new CourseParticulars();

    //this.formModel = new CourseParticulars();
    this.course = new Course();
    this.course.courseParticulars = new Array<CourseParticulars>();

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
    else if (this.action.method == "View"){
      this.getDepartments();
      this.getCourses();
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
    //this.department.departmentId = this.depPos.toString();
    this.departmentParticulars = this.departments[this.depPos].departmentParticulars;
  }

  onSelectSubject(){
    
  }

  addSubject(){
    this.model = new Department();
    this.model.departmentId = this.department.departmentId;
    this.model.departmentName = this.department.departmentName;
    
    //below two variables are used as storage for screen manipulation. data is not stored
    this.model.entityId = this.depPos;
    this.model.schoolYearId = this.subPos;

    this.model.departmentParticulars = new Array<DepartmentParticulars>();
    this.model.departmentParticulars.push(this.departmentParticulars[this.subPos]);
    //this.model.departmentParticulars[0] = this.departmentParticulars[this.subPos];
    
    this.formModel.push(this.model);
    console.log("Model Value..");
    console.log(this.model);
    console.log("FormModel Value..");
    console.log(this.formModel);
  }

  editSubject(){
    
    
    this.model = new Department();
    this.model.departmentId = this.department.departmentId;
    this.model.departmentName = this.department.departmentName;
    
    //below two variables are used as storage for screen manipulation. data is not stored
    this.model.entityId = this.depPos;
    this.model.schoolYearId = this.subPos;

    this.model.departmentParticulars = new Array<DepartmentParticulars>();
    this.model.departmentParticulars.push(this.departmentParticulars[this.subPos]);
    //this.model.departmentParticulars[0] = this.departmentParticulars[this.subPos];
    
    this.model.departmentParticulars[0].departmentId = this.formModel[this.editArrayPosition].departmentParticulars[0].departmentId;
    

    this.formModel[this.editArrayPosition] = this.model;
    
     //this.action.method = 'Create';
     this.action.submethod = 'Add';
   }
  
  actionEdit(toEdit: number){
    this.action.submethod = "Edit";
    this.editArrayPosition = toEdit - 1;
    this.depPos = this.formModel[this.editArrayPosition].entityId;
    this.onSelectDepartment();
    this.subPos = this.formModel[this.editArrayPosition].schoolYearId;
  }

  async onSubmit(){
    this.course.obsolete = '0';
    this.course.entityId = 25;
    this.course.schoolYearId = 2;
    this.course.courseParticulars = new Array<CourseParticulars>();

    let itr = 0;
    for (let t_department of this.formModel){
      let t_courseParticular = new CourseParticulars();
      t_courseParticular.departmentId = this.formModel[itr].departmentId;
      t_courseParticular.subjectId = this.formModel[itr].departmentParticulars[0].subjectId;
      //this is to esnure records is updated rather added. During fethc time right value was assigned
      //its only for View - Edit mode
      t_courseParticular.recordId = this.formModel[itr].departmentParticulars[0].departmentId;
      t_courseParticular.courseId = this.formModel[itr].departmentHeadId;
      
      this.course.courseParticulars.push(t_courseParticular);
      itr = itr + 1;
    }
    //this.course.courseParticulars = this.courseParticulars;

    console.log("Course Object Value...");
    console.log(JSON.stringify(this.course));
    await this.courseService.createCourse(this.course).then(result => this.course=result); 
  }
  getCourses(){
    this.courseService.getCourses(25,2).subscribe((data: Array<Course>) => {
      this.courses = data;
      });
  }
  
  onSelectCourse(){
    //console.log(this.count);
    this.course.courseName = this.courses[this.count].courseName;
    this.course.courseId = this.courses[this.count].courseId;
    //this.course.courseParticulars = this.courses[this.count].courseParticulars;
    
    this.courseParticulars = this.courses[this.count].courseParticulars;
    //let count=0;
      
    for (let t_courseParticulars of this.courseParticulars){
      let i = 0;
      let fetchDepartment = new Department();
      fetchDepartment.departmentParticulars = new Array<DepartmentParticulars>();
      
      let fetchDepartmentParticulars = new DepartmentParticulars();

      for (let department of this.departments){
        

        if (t_courseParticulars.departmentId == department.departmentId){
          fetchDepartment.departmentId = department.departmentId;
          fetchDepartment.departmentName = department.departmentName;
          //this field is also used as temporary storage
          fetchDepartment.departmentHeadId = t_courseParticulars.courseId;

          fetchDepartment.entityId = i;
          this.depPos = i;
          //this.onSelectDepartment();
          let j = 0;
          
          for (let departmentParticular of department.departmentParticulars){
            if(t_courseParticulars.subjectId == departmentParticular.subjectId){
              fetchDepartmentParticulars.subjectId = departmentParticular.subjectId;
              fetchDepartmentParticulars.subjectName = departmentParticular.subjectName;
              fetchDepartmentParticulars.subSubjectName = departmentParticular.subSubjectName;
              //below value is stored to ensure record is is passed. otherwise new entry will get created
              fetchDepartmentParticulars.departmentId = t_courseParticulars.recordId;
              fetchDepartment.schoolYearId = j;
              this.subPos = j;
            }
            j = j + 1;
          }
        }
        i = i + 1;
      }
      fetchDepartment.departmentParticulars.push(fetchDepartmentParticulars);
      this.formModel.push(fetchDepartment);
      //count = count + 1;
    }
    console.log("after formModel created...");
    console.log(this.formModel);
  }
  


} 


export class KeyUpComponent_v4 {
  value = '';
  update(value: string) { this.value = value; }
}

