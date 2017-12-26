export class User {
    public userId: string;
    public username: string;
    public firstName:string;
    public lastName: string;
    public email: string;
    public password: string;
    public obsolete: string;
}

export class Profile {
	public userId: string;
	public username: string;
    public middleName: string;
    public firstName:string;
    public lastName: string;
    public dob: string;
    public obsolete: string;
}

export class Action {
    public method: string;
    public submethod: string;
    public nextAddress: string;
}