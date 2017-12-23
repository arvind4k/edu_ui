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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var discount_model_1 = require("./discount.model");
var fee_service_1 = require("../fee.service");
var common_service_1 = require("../../common/common.service");
var discount_service_1 = require("./discount.service");
var router_1 = require("@angular/router");
var DiscountComponent = (function () {
    function DiscountComponent(discountService, commonService, feeService, router, route, datePipe) {
        this.discountService = discountService;
        this.commonService = commonService;
        this.feeService = feeService;
        this.router = router;
        this.route = route;
        this.datePipe = datePipe;
        this.model = new discount_model_1.Discount();
        this.submitted = false;
        this.discountCategories = [];
        this.batches = [];
        this.feeCategories = [];
        this.feeParticulars = [];
        this.studentCategories = [];
    }
    DiscountComponent.prototype.ngOnInit = function () {
        this.getDiscountCategories();
        this.getAllBatches();
        this.model.discountCategoryId = "0";
        this.model.batchId = "0";
        this.model.feeCategoryId = "0";
        this.model.appliedOn = "0";
        this.model.studentCategoryId = "0";
        this.discountId = this.route.snapshot.paramMap.get('discountId');
        if (Number(this.discountId) > 0) {
            this.getDiscountById();
        }
    };
    DiscountComponent.prototype.getDiscountCategories = function () {
        var _this = this;
        this.discountService.getDiscountCategories().subscribe(function (data) {
            _this.discountCategories = data;
        });
    };
    DiscountComponent.prototype.getAllBatches = function () {
        var _this = this;
        this.commonService.getBatches().subscribe(function (data) {
            _this.batches = data;
        });
    };
    DiscountComponent.prototype.getFeeList = function () {
        var _this = this;
        this.feeService.getFeeCategoriesByBatchId(this.model.batchId).subscribe(function (data) {
            _this.feeCategories = data;
        });
    };
    DiscountComponent.prototype.getDiscountById = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.discountService.getDiscountById(this.discountId).subscribe(function (data) {
                            _this.model = data;
                            console.log(_this.model);
                            _this.getFeeList();
                            _this.getFeeParticularList();
                            _this.getStudentCategories();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DiscountComponent.prototype.getFeeParticularList = function () {
        var _this = this;
        this.feeService.getFeeParticulars(this.model.feeCategoryId, this.model.batchId).subscribe(function (data) {
            _this.feeParticulars = data;
        });
    };
    DiscountComponent.prototype.getStudentCategories = function () {
        console.log(this.model.discountCategoryId);
        if (this.model.discountCategoryId == 'Category.STUDENT_CATEGORY') {
            this.studentCategories = this.commonService.getStudentCategories();
        }
    };
    DiscountComponent.prototype.onSubmit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.model.updationDate = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
                        if (!this.model.discountId) {
                            this.model.creationDate = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
                        }
                        this.model.obsolete = "0";
                        console.log("model = ", JSON.stringify(this.model));
                        return [4 /*yield*/, this.discountService.saveOrUpdateDiscount(this.model).then(function (result) { return _this.model = result; })];
                    case 1:
                        _a.sent();
                        this.submitted = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    return DiscountComponent;
}());
DiscountComponent = __decorate([
    core_1.Component({
        selector: 'discount-app',
        templateUrl: './discount.view.html'
    }),
    __metadata("design:paramtypes", [discount_service_1.DiscountService,
        common_service_1.CommonService,
        fee_service_1.FeeService,
        router_1.Router,
        router_1.ActivatedRoute,
        common_1.DatePipe])
], DiscountComponent);
exports.DiscountComponent = DiscountComponent;
//# sourceMappingURL=discount.component.js.map