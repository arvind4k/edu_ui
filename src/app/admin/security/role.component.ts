import { Component, Input } from '@angular/core';
import { UserRole, UserRoleParticulars, Action} from './role.model';
import { RoleService } from './role.service';
import { Router, ActivatedRoute } from '@angular/router';
//import { ActivatedRoute } from '@angular/router/src/router_state';


@Component({
  selector: 'role-app',
  templateUrl: './role.view.html'
})
export class RoleComponent {
 
  modules = ['EORG', 'Department'];

  userRoleParticulars: Array<UserRoleParticulars>;
  userRoleParticular: UserRoleParticulars;

  userRoles: Array<UserRole>;

  //model: UserRoleParticulars;
  //formModel: UserRoleParticulars;
  
  userRole: UserRole;

  count: number;
  
  action: Action;


  constructor(private roleService: RoleService, private router: Router, private activatedRoute: ActivatedRoute) {  
  
  }
  ngOnInit(): void {
    let type = this.activatedRoute.snapshot.paramMap.get('action');
    console.log("Action");
    console.log(type);
    
    this.action = new Action();
    this.action.method = type;

    this.userRole = new UserRole();
    this.userRole.userRoleParticulars = new Array<UserRoleParticulars>();

    this.userRoleParticulars = new Array<UserRoleParticulars>();
    this.userRoleParticulars = this.userRole.userRoleParticulars;

    if (this.action.method == "View") {
      this.getRoles();

    }
    else if (this.action.method == "Create") {
      for (let module of this.modules){
        this.userRoleParticular = new UserRoleParticulars();
        this.userRoleParticular.moduleName = module;
        this.userRoleParticular.oview = 0;
        this.userRoleParticular.oedit = 0;
        this.userRoleParticular.oupdate = 0;
        this.userRoleParticular.odelete = 0;
        
        this.userRoleParticulars.push(this.userRoleParticular);
      }
      //this.getRoles();
    }
  }
  
  async onSubmit(){
    this.userRole.obsolete = '0';
    this.userRole.entityId = 25;
    
    
    console.log(JSON.stringify(this.userRole));
    await this.roleService.createRole(this.userRole).then(result => this.userRole=result); 
  }
  getRoles(){
    this.roleService.getRoles(25).subscribe((data: Array<UserRole>) => {
      this.userRoles = data;
      });
  }
  onSelectRole(){
    console.log(this.count);
    this.userRole = this.userRoles[this.count];
    this.userRoleParticulars = this.userRole.userRoleParticulars;
  }
} 
export class KeyUpComponent_v4 {
  value = '';
  update(value: string) { this.value = value; }
}

