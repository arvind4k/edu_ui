"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var discount_service_1 = require("./discount.service");
var router_1 = require("@angular/router");
var DiscountCategoryListComponent = (function () {
    function DiscountCategoryListComponent(discountService, router, route) {
        this.discountService = discountService;
        this.router = router;
        this.route = route;
        this.discountCategories = [];
        this.submitted = false;
    }
    DiscountCategoryListComponent.prototype.ngOnInit = function () {
        this.getDiscountCategories();
    };
    DiscountCategoryListComponent.prototype.getDiscountCategories = function () {
        var _this = this;
        this.discountService.getDiscountCategories().subscribe(function (data) {
            _this.discountCategories = data;
        });
    };
    DiscountCategoryListComponent.prototype.redirectToDiscountCategory = function (discountCategoryId) {
        this.router.navigate(['/discount/category', discountCategoryId]);
    };
    return DiscountCategoryListComponent;
}());
DiscountCategoryListComponent = __decorate([
    core_1.Component({
        selector: 'dis-cat-list-app',
        templateUrl: './disCategoryList.view.html'
    }),
    __metadata("design:paramtypes", [discount_service_1.DiscountService,
        router_1.Router,
        router_1.ActivatedRoute])
], DiscountCategoryListComponent);
exports.DiscountCategoryListComponent = DiscountCategoryListComponent;
//# sourceMappingURL=disCategory.list.component.js.map