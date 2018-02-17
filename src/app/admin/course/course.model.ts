export class Course {
    public courseId: string;
    public courseName: string;
    public educationLevel: number;
    public obsolete: string;
    public schoolYearId: number;
    public entityId: number;
    public checked: string;
    public courseParticulars: Array<CourseParticulars>;
}

export class  CourseParticulars{
    public recordId: string;
    public courseId: number;
    public departmentId: string;
    public subjectId: string; //Foreign Key
    public obsolete: string;
    
}

export class  Session{
    public sessionId: string;
    public sessionName: string;
}
export class Action {
    public method: string;
    public submethod: string;
    public stopcount: Number;
}

    
    