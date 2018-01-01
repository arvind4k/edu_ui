import { Address } from '../../common/address/address.model'

export class User {
    public userId: string;
    public username: string;
    public firstName:string;
    public middleName:string;
    public lastName: string;
    public gender: string;
    public dob: string;
    public email: string;
    public password: string;
    public phone: string;
    public mobile: string;
    public profileImage: string;
    public termsAndCondition:string;
    public obsolete: string;
    public isComplete: string;
}

export class Guardian {
    public userId: string;
    public relationship: string;
    public firstName: string;
    public lastName: string;
    public phone: string;
    public mobile: string;
    public email: string;
    public qualification: string;
}

export class Qualification{
    public userId: string;
    public class: string;
    public grade: string;
    public score: string;
    public institution: string;
    public university: string;
    public passingYear: string;
}

export class SchoolDetails {
    public userId: string;
    public class: string;
    public department: string;
    public section: string;
    public entrollmentDate: string;
}

export class Profile {
	public user: User=new User();
    public guardians:Array<Guardian>=[];
    public addresses:Array<Address>=[];
    public schoolDetails: SchoolDetails=new SchoolDetails();
    public qualifications: Array<Qualification>=[];
}

