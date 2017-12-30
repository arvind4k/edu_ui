import { Component, Input } from '@angular/core';
import { Transport, TransportParticulars, Action} from './transport.model';
import { TransportService } from './transport.service';
import { Router, ActivatedRoute } from '@angular/router';
//import { ActivatedRoute } from '@angular/router/src/router_state';


@Component({
  selector: 'transport-app',
  templateUrl: './transport.view.html'
})
export class TransportComponent {
 
  routes: Array<TransportParticulars>;
  transports: Array<Transport>;

  model: TransportParticulars;
  formModel: TransportParticulars;
  transport: Transport;

  count: number;
  editArrayPosition: number;
  action: Action;


  constructor(private transportService: TransportService, private router: Router, private activatedRoute: ActivatedRoute) {  
  
  }
  ngOnInit(): void {
    let type = this.activatedRoute.snapshot.paramMap.get('action');
    console.log("Action");
    console.log(type);

    this.routes = new Array<TransportParticulars>();
    this.formModel = new TransportParticulars();
    this.transport = new Transport();
    this.transports = new Array<Transport>();

    this.count = 1;
    this.editArrayPosition = 0;
    this.action = new Action();
    this.action.method = type;
    if (this.action.method == "View") {
      this.getRoutes();
    }
  }
  
  addRoute(stopName: string, stopCost: string){
   
    this.model = new TransportParticulars();
    this.model.stopName = stopName;
    this.model.stopCost = stopCost;
    this.model.stopNumber = this.count;
    this.model.obsolete = '0';
    this.routes.push(this.model);
    this.count = this.count + 1;
    this.formModel.stopName ='';
    this.formModel.stopCost ='';
  }
  editRoute(stopName: string, stopCost: string){
    
    
    this.routes[this.editArrayPosition].stopName = stopName;
    this.routes[this.editArrayPosition].stopCost = stopCost;

     this.formModel.stopName ='';
     this.formModel.stopCost ='';
     //this.action.method = 'Create';
     this.action.submethod = 'Add';
   }
  
  actionEdit(toEdit: number, stopName: string, stopCost: string){
    this.action.submethod = "Edit";
    //this.action.method = "";
    //below assignment will cause value to go empty hence update should be displayed
    this.formModel.stopNumber = toEdit;
    this.formModel.stopName = stopName;
    this.formModel.stopCost = stopCost;
    this.editArrayPosition = toEdit - 1;
  }

  async onSubmit(){
    this.transport.obsolete = '0';
    this.transport.entityId = 25;
    this.transport.transportParticulars = this.routes;
    console.log(JSON.stringify(this.transport));
    await this.transportService.createTransport(this.transport).then(result => this.transport=result); 
  }
  getRoutes(){
    this.transportService.getTransports(25).subscribe((data: Array<Transport>) => {
      this.transports = data;
      });
  }
  onSelectRoute(){
    console.log(this.count);
    this.transport.routeName = this.transports[this.count].routeName;
    this.transport.routeId = this.transports[this.count].routeId;
    this.transport.transportParticulars = this.transports[this.count].transportParticulars;
    
    this.routes = this.transports[this.count].transportParticulars;
  }
} 


export class KeyUpComponent_v4 {
  value = '';
  update(value: string) { this.value = value; }
}

