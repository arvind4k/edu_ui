"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms"); // <-- NgModel lives here
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var app_routing_module_1 = require("./app-routing.module");
var home_component_1 = require("./home/home.component");
var user_component_1 = require("./user/user.component");
var fee_category_component_1 = require("./finance/fee.category.component");
var fee_particular_component_1 = require("./finance/fee.particular.component");
var fee_list_component_1 = require("./finance/fee.list.component");
var particular_list_component_1 = require("./finance/particular.list.component");
var fee_view_component_1 = require("./finance/fee.view.component");
var discountCategory_component_1 = require("./finance/discount/discountCategory.component");
var discount_component_1 = require("./finance/discount/discount.component");
var disCategory_list_component_1 = require("./finance/discount/disCategory.list.component");
var discount_list_component_1 = require("./finance/discount/discount.list.component");
var user_service_1 = require("./user/user.service");
var fee_service_1 = require("./finance/fee.service");
var authentication_service_1 = require("./login/authentication.service");
var common_service_1 = require("./common/common.service");
var discount_service_1 = require("./finance/discount/discount.service");
var fine_component_1 = require("./finance/fine.component");
var login_component_1 = require("./login/login.component");
var can_activate_authguard_1 = require("./login/can-activate.authguard");
var menu_component_1 = require("./home/menu.component");
var main_component_1 = require("./home/main.component");
var header_component_1 = require("./home/header.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            app_routing_module_1.AppRoutingModule,
            http_1.HttpModule
        ],
        declarations: [
            home_component_1.HomeComponent,
            user_component_1.UserComponent,
            fee_category_component_1.FeeCategoryComponent,
            fee_particular_component_1.FeeParticularComponent,
            fee_list_component_1.FeeListComponent,
            particular_list_component_1.FeeParticularListComponent,
            fee_view_component_1.FeeViewComponent,
            discountCategory_component_1.DiscountCategoryComponent,
            discount_component_1.DiscountComponent,
            disCategory_list_component_1.DiscountCategoryListComponent,
            discount_list_component_1.DiscountListComponent,
            fine_component_1.FineComponent,
            login_component_1.LoginComponent,
            menu_component_1.MenuComponent,
            main_component_1.MainComponent,
            header_component_1.HeaderComponent,
        ],
        providers: [user_service_1.UserService, fee_service_1.FeeService, common_service_1.CommonService, discount_service_1.DiscountService, common_1.DatePipe, authentication_service_1.AuthenticationService, can_activate_authguard_1.CanActivateAuthGuard],
        bootstrap: [main_component_1.MainComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map