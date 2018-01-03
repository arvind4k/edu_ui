export class UserRole {
    public roleId: Number;
    public roleName: string;
    public entityId: Number;
    public obsolete: string;
    public userRoleParticulars: Array<UserRoleParticulars>;
}

export class UserRoleParticulars {
    public recrodId: Number;
    public roleId: Number;
    public moduleName: string;
    public oview: Number;
    public oedit: Number;
    public oupdate: Number;
    public odelete: Number;
}

export class Action {
    public method: string;
    public submethod: string;
    public stopcount: Number;
}

    
    