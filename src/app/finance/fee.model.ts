export class FeeCategory {
    public feeCategoryId: string;
    public feeName: string;
    public feeDescription: string;
    public startDate: string;
    public endDate: string;
    public paymentFrequencyId: string;
    public dueDate: string;
    public feeBatchMapping: FeeBatchMapping[];
    public paymentFrequencyDesc:string;
}

export class FeeBatchMapping {
    public batchId: string;
    public feeCategoryId: string;
    public batchName: string;
}

export class FeeParticular{
    public particularId:string;
    public feeCategoryId:string;
    public name:string;
    public description:string;
    public amount:string;
    public batchId: string;
    public batchName: string;
    public inputAs: string;
    public paymentFrequencyId: string;
    public paymentFrequencyDesc: string;
    public numberOfMonths:string;
    public inputAsMonth: string;
    public inputAsFrequency: string;
}

export class Fine{
    public fineId:string;
    public fineName:string;
    public fineSlabs: Array<FineSlab>=[];
}

export class FineSlab{
    public fineSlabId: string;
    public delayDays:string;
    public fineValue:string;
    public fineMode: string;
}