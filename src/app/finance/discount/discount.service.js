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
var http_1 = require("@angular/http");
var DiscountService = (function () {
    function DiscountService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Accepts': 'text/plain ; application/json', 'Content-type': 'Application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
    }
    DiscountService.prototype.getDiscountCategories = function () {
        return this.http.get('http://localhost:9002/discountCategory').map(function (res) { return res.json(); }).map(function (data) {
            return data["_embedded"].discountCategory;
        });
    };
    DiscountService.prototype.getDiscountCategoryById = function (discountCategoryId) {
        return this.http.get('http://localhost:9002/discountCategory/' + discountCategoryId).map(function (res) { return res.json(); }).map(function (data) {
            return data;
        });
    };
    DiscountService.prototype.createDiscountCategory = function (discountCategory) {
        return this.http
            .post("http://localhost:9002/discountCategory", JSON.stringify(discountCategory), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DiscountService.prototype.deleteDiscountCategory = function (discountCategoryId) {
        /*return this.http.delete('http://localhost:9002/discountCategory/'+discountCategoryId, this.headers).then
        (success => success.status);*/
    };
    DiscountService.prototype.getDiscounts = function () {
        return this.http.get('http://localhost:9002/discount').map(function (res) { return res.json(); }).map(function (data) {
            return data["_embedded"].discount;
        });
    };
    DiscountService.prototype.getValidDiscounts = function () {
        return this.http.get('http://localhost:9002/discount/search/findValidDiscounts').map(function (res) { return res.json(); }).map(function (data) {
            return data["_embedded"].discount;
        });
    };
    DiscountService.prototype.getDiscountsByFeeIdAndBatchId = function (feeId, batchId) {
        return this.http.get('http://localhost:9002/discount/search/findDiscountsByFeeIdAndBatchId/?feeId=' + feeId + '&batchId=' + batchId).map(function (res) { return res.json(); }).map(function (data) {
            return data["_embedded"].discount;
        });
    };
    DiscountService.prototype.getDiscountById = function (discountId) {
        return this.http.get('http://localhost:9002/discount/' + discountId).map(function (res) { return res.json(); }).map(function (data) {
            return data;
        });
    };
    DiscountService.prototype.saveOrUpdateDiscount = function (discount) {
        return this.http
            .post("http://localhost:9002/discount", JSON.stringify(discount), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DiscountService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return DiscountService;
}());
DiscountService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DiscountService);
exports.DiscountService = DiscountService;
//# sourceMappingURL=discount.service.js.map