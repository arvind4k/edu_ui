export class Department {
    public departmentId: string;
    public departmentName: string;
    public departmentHeadId: number;
    public obsolete: string;
    public entityId: number;
    public schoolYearId: number;
    public departmentParticulars: Array<DepartmentParticulars>;
}

export class DepartmentParticulars {
    public subjectId: string;
    public departmentId: string;
    public subjectName: string;
    public subSubjectName: string;
    public obsolete: string;
    
}

export class Action {
    public method: string;
    public submethod: string;
    public stopcount: Number;
}

    
    