export class Course {
    public courseId: string;
    public courseName: string;
    public educationLevel: number;
    public obsolete: string;
    public sessionId: number;
    public courseParticulars: Array<CourseParticulars>;
}

export class  CourseParticulars{
    public recordId: string;
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

    
    