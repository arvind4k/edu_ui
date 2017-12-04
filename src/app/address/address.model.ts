
export class AddressType { type = ['HOME' , 'RESIDENTIAL' , 'BUSINESS' , 'PERMANENT' , 'RENTED' , 'OFFICE'] };

export class Address {
    public addressId: string;
    public addressType: string;
	public moduleName: string;
    public modId: string;
    public address1: string;
    public address2: string;
    public country: string;
    public zip: string;
    public city: string;
    public state: string;
    public obsolete: string;
}

export class Action {
    public method: string;
    public submethod: string;
    //public readonly: string;
    //public disabled: string;
}

