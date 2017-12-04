//import { Address } from '../common/common.model';

export class User {
	public userId: string;
	public username: string;
    public middleName: string;
    public firstName:string;
    public lastName: string;
    public dob: string;
    //public address:  Address; 
   /* public address1: string;
    public address2: string;
    public city: string;
    public state: string;
    public country: string;
    public zip: string;*/
    public obsolete: string;
}

export class Action {
    public method: string;
    public submethod: string;
    public nextAddress: string;
    //public readonly: string;
    //public disabled: string;
}