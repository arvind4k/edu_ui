import {COUNTRIES,RELIGIONS,NATIONALITIES,CASTES} from './data';
//import {Entity} from "app/user/profile/entity.model";

export enum PType {PHONE, MOBILE, EMAIL, FAX, FACEBOOK, TWITTER};
export enum AddressType {HOME, RESIDENTIAL, BUSINESS, PERMANENT, RENTED, OFFICE};

export class Country{
    name: string;
    alpha2_code: string;
    alpha3_code: string;
}

export class Nationality{}

export class Religion {}

export class Caste {}

export class Label {}

export class StudentCategory{}

export class Gender{}

export class Relation{
    code: string;
    name: string;
}

export class Batch{
    batchId: string;
    batchName: string;
    batchDescription: string;
    checked: string;
}

export class PaymentFrequency {
    public paymentFrequencyId: string;
    public description: string;
    public numberOfMonths: string;
}

export class Page {
	public pageNo: string;
	public itemsPerPage: string;
	public orderType: string;
	public sortColumn: string;
}
