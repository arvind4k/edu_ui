import { Component, Input } from '@angular/core';
import { Course, CourseParticulars, Session, Action} from './course.model';
import { Department} from '../department/department.model';
import { CourseService } from './course.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'course-app',
  templateUrl: './course.view.html'
})
export class CourseComponent {
 
  courseParticulars: Array<CourseParticulars>;
  courses: Array<Course>;
  departments: Array<Department>;

  sessions: Array<Session>;
  model: CourseParticulars;
  formModel: CourseParticulars;
  course: Course;

  count: number;
  editArrayPosition: number;
  action: Action;


  constructor(private transportService: CourseService, private router: Router, private activatedRoute: ActivatedRoute) {  
  
  }
  ngOnInit(): void {
    let type = this.activatedRoute.snapshot.paramMap.get('action');
    console.log("Action");
    console.log(type);

    this.courseParticulars = new Array<CourseParticulars>();
    this.formModel = new CourseParticulars();
    this.course = new Course();
    this.courses = new Array<Course>();
    this.sessions = new Array<Session>();
    this.departments = new Array<Department>();
    
    this.count = 1;
    this.editArrayPosition = 0;
    this.action = new Action();
    this.action.method = type;
  }
  
  addSubject(departmentId: string, subjectId: string){
   
    this.model = new CourseParticulars();
    this.model.departmentId = departmentId;
    this.model.subjectId = subjectId;
    
    this.model.obsolete = '0';
    this.courseParticulars.push(this.model);
    this.count = this.count + 1;
    this.formModel.departmentId ='';
    this.formModel.subjectId ='';
  }
  editSubject(departmentId: string, subjectId: string){
    
    
    this.courseParticulars[this.editArrayPosition].departmentId = departmentId;
    this.courseParticulars[this.editArrayPosition].subjectId = subjectId;

     this.formModel.departmentId ='';
     this.formModel.subjectId ='';
     //this.action.method = 'Create';
     this.action.submethod = 'Add';
   }
  
  actionEdit(toEdit: number, departmentId: string, subjectId: string){
    this.action.submethod = "Edit";
    //this.action.method = "";
    //below assignment will cause value to go empty hence update should be displayed
    //this.formModel.stopNumber = toEdit;
    this.formModel.departmentId = departmentId;
    this.formModel.subjectId = subjectId;
    this.editArrayPosition = toEdit - 1;
  }

  async onSubmit(){
    this.course.obsolete = '0';
    this.course.courseParticulars = this.courseParticulars;
    console.log(JSON.stringify(this.course));
    await this.transportService.createCourse(this.course).then(result => this.course=result); 
  }
  getRoutes(){
    this.transportService.getCourses().subscribe((data: Array<Course>) => {
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

