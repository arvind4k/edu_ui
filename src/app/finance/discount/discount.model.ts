export class DiscountCategory {
    public discountCategoryId: string;
    public name: string;
    public description: string;
    public categoryId: string;
}

export class Discount {
    public discountId: string;
    public discountCategoryId: string;
    public studentCategoryId: string;
    public studentId: string;
    public batchId: string;
    public discountName: string;
    public feeCategoryId: string;
    public feeName: string;
    public discountCategoryName: string;
    public studentCategoryName: string
    public studentName: string;
    public appliedOn: string;
    public discountMode: string;
    public amount: string;
    public percentage: string;
    public creationDate: any;
    public updationDate: any;
    public obsolete: string;
}

