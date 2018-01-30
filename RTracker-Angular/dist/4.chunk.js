webpackJsonp([4],{

/***/ "../../../../../src/app/layout/password/password-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__password_component__ = __webpack_require__("../../../../../src/app/layout/password/password.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__password_component__["a" /* PasswordComponent */] }
];
var PasswordRoutingModule = (function () {
    function PasswordRoutingModule() {
    }
    return PasswordRoutingModule;
}());
PasswordRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], PasswordRoutingModule);

//# sourceMappingURL=password-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/layout/password/password.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"section-container\">\r\n    <h6 class=\"section-content-header\">Change Password</h6>\r\n</div>\r\n<div class=\"horizontal-pipe-line\"></div>\r\n<div class=\"alert alert-warning\" role=\"alert\" *ngIf=\"ftlogin\">\r\n  <strong>Warning!</strong> Please change your password.\r\n</div>\r\n\r\n<div class=\"section-detail-container\">\r\n    <form novalidate #chPwdForm=\"ngForm\" (ngSubmit)=\"onSumbit(chPwdForm.value)\" class=\"hris-form\">\r\n        <div class=\"row\">\r\n            <div class=\"col-6\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"row\">\r\n                        <label class=\"col-4 aa-hris-input-label\"> Enter Current Password <span class=\"pull-right\"> : </span> </label>\r\n                        <div class=\"col-6\">\r\n                            <input type=\"password\" name=\"Current_Password\" [(ngModel)]=\"Current_Password\" #cp=\"ngModel\" class=\"form-control aa-hris-pwd-input\" required>\r\n                            <div *ngIf=\"cp.invalid && (cp.touched)\" class=\"alert alert-danger\">\r\n    \t\t\t\t\t\t\t<div *ngIf=\"cp.errors.required\">\r\n    \t\t\t\t\t\t\t\tCurrent password is required.\r\n    \t\t\t\t\t\t\t</div>\r\n    \t\t\t\t\t\t</div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <div class=\"row\">\r\n                        <label class=\"col-4 aa-hris-input-label\"> Enter New Password <span class=\"pull-right\"> : </span> </label>\r\n                        <div class=\"col-6\">\r\n                            <input type=\"password\" name=\"New_Password\" [(ngModel)]=\"New_Password\" #np=\"ngModel\" class=\"form-control aa-hris-pwd-input\" required minlength=\"4\" (input)=\"checkOldNewPassword()\" >\r\n                            <div *ngIf=\"np.invalid && (np.touched)\" class=\"alert alert-danger\">\r\n    \t\t\t\t\t\t\t<div *ngIf=\"np.errors.required\">\r\n    \t\t\t\t\t\t\t\tNew password is required.\r\n    \t\t\t\t\t\t\t</div>\r\n    \t\t\t\t\t\t\t<div *ngIf=\"np.hasError('minlength')\">\r\n    \t\t\t\t\t\t\t\tAt least 4 character password is required.\r\n    \t\t\t\t\t\t\t</div>\r\n    \t\t\t\t\t\t</div>\r\n                            <div *ngIf=\"oldNewPwdAlertMessage.length > 0\" class=\"alert alert-danger\">\r\n                                {{ oldNewPwdAlertMessage }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <div class=\"row\">\r\n                        <label class=\"col-4 aa-hris-input-label\"> Confirm New Password <span class=\"pull-right\"> : </span> </label>\r\n                        <div class=\"col-6\">\r\n                            <input type=\"password\" name=\"Confirm_New_Password\" [(ngModel)]=\"Confirm_New_Password\" #cnp=\"ngModel\" class=\"form-control aa-hris-pwd-input\" required (blur)=\"checkNewPassword()\" >\r\n                            <div *ngIf=\"cnp.invalid && (cnp.touched)\" class=\"alert alert-danger\">\r\n    \t\t\t\t\t\t\t<div *ngIf=\"cnp.errors.required\">\r\n    \t\t\t\t\t\t\t\tPlease re-enter the new password.\r\n    \t\t\t\t\t\t\t</div>\r\n    \t\t\t\t\t\t</div>\r\n                            <div *ngIf=\"confirmPwdAlertMessage.length > 0\" class=\"alert alert-danger\">\r\n                                {{ confirmPwdAlertMessage }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-5 aa-hris-btn-group\">\r\n                <button class=\"btn btn-default btn-primary submit pull-right \" type=\"submit\"> Submit </button>\r\n                <button class=\"btn btn-default btn-secondary cancel pull-right\" type=\"reset\" (click)=\"cancel()\"> Cancel </button>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/layout/password/password.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".tab-h6 {\n  font-size: 18px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/password/password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared__ = __webpack_require__("../../../../../src/app/shared/index.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PasswordComponent = (function () {
    function PasswordComponent(passwordService, router, route) {
        this.passwordService = passwordService;
        this.router = router;
        this.route = route;
        this.Current_Password = "";
        this.New_Password = "";
        this.Confirm_New_Password = "";
        this.confirmPwdAlertMessage = "";
        this.oldNewPwdAlertMessage = "";
        this.ftlogin = false;
    }
    PasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.ftlogin = params['lpc_at'] === "null" ? true : false;
        });
    };
    PasswordComponent.prototype.checkOldNewPassword = function () {
        if (this.New_Password.length && this.Current_Password && this.New_Password === this.Current_Password) {
            this.oldNewPwdAlertMessage = "Current and new passwords cannot be the same.";
        }
        else {
            this.oldNewPwdAlertMessage = "";
        }
    };
    PasswordComponent.prototype.checkNewPassword = function () {
        if (this.New_Password.length && this.Confirm_New_Password && this.New_Password !== this.Confirm_New_Password) {
            this.confirmPwdAlertMessage = "New Password and Confirm New Password fields do not match.";
        }
        else {
            this.confirmPwdAlertMessage = "";
        }
    };
    PasswordComponent.prototype.onSumbit = function (model) {
        var _this = this;
        this.checkOldNewPassword();
        this.checkNewPassword();
        if (this.chPwdForm.valid && this.confirmPwdAlertMessage == "" && this.oldNewPwdAlertMessage == "") {
            console.log("Submitted!");
            model["username"] = sessionStorage.getItem('username');
            this.passwordService.changePassword(model)
                .subscribe(function (response) {
                var body = response.json();
                if (body.result === "success") {
                    sessionStorage.removeItem('isLoggedin');
                    sessionStorage.removeItem('userRole');
                    sessionStorage.removeItem('username');
                    sessionStorage.removeItem('empname');
                    _this.router.navigate(['/login']);
                }
                alert(body.message);
            }, function (error) { return console.log(error); });
        }
        else {
            alert("Required fields are mandatory.");
        }
    };
    PasswordComponent.prototype.cancel = function () {
        this.chPwdForm.reset();
    };
    return PasswordComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('chPwdForm'),
    __metadata("design:type", Object)
], PasswordComponent.prototype, "chPwdForm", void 0);
PasswordComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'app-password',
        template: __webpack_require__("../../../../../src/app/layout/password/password.component.html"),
        styles: [__webpack_require__("../../../../../src/app/layout/password/password.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared__["e" /* PasswordService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared__["e" /* PasswordService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object])
], PasswordComponent);

var _a, _b, _c;
//# sourceMappingURL=password.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/password/password.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__password_routing_module__ = __webpack_require__("../../../../../src/app/layout/password/password-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__password_component__ = __webpack_require__("../../../../../src/app/layout/password/password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordModule", function() { return PasswordModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var PasswordModule = (function () {
    function PasswordModule() {
    }
    return PasswordModule;
}());
PasswordModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["k" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_3__password_routing_module__["a" /* PasswordRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["a" /* TranslateModule */],
            __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot()
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__password_component__["a" /* PasswordComponent */]
        ],
        schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* CUSTOM_ELEMENTS_SCHEMA */]]
    })
], PasswordModule);

//# sourceMappingURL=password.module.js.map

/***/ })

});
//# sourceMappingURL=4.chunk.js.map