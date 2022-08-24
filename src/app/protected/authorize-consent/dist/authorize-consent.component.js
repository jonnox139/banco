"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var pop_up_authorize_access_component_1 = require("../pop-up-authorize-access/pop-up-authorize-access.component");
var sweetalert2_1 = require("sweetalert2");
var AuthorizeConsentComponent = /** @class */ (function () {
    function AuthorizeConsentComponent(AuthorizeConsent, dialog, router) {
        this.AuthorizeConsent = AuthorizeConsent;
        this.dialog = dialog;
        this.router = router;
        this.cuentaOrigen = JSON.parse(localStorage.getItem('selectedAccount') || '{}');
        this.user = JSON.parse(localStorage.getItem('user') || '{}');
    }
    Object.defineProperty(AuthorizeConsentComponent.prototype, "usuario", {
        get: function () {
            return this.AuthorizeConsent.usuario;
        },
        enumerable: true,
        configurable: true
    });
    AuthorizeConsentComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (Object.keys(this.cuentaOrigen).length == 0) {
            sweetalert2_1["default"].fire({
                icon: 'error',
                text: 'Por favor, revise su entrada, no se encontró una cuenta origen seleccionada.',
                timer: 1500,
                showConfirmButton: false
            }).then(function (e) {
                _this.router.navigateByUrl('/dashboard');
            });
        }
        else {
            this.nombreCuentaOrigen = this.cuentaOrigen.numerocuenta;
            this.tipoDocumentoOrigen = 'CC';
            this.numDocumentoOrigen = '12345';
            this.BancoOrigen = 'Caja Social';
            this.nombreCuentaDestino = '99999';
            this.BancoDestino = 'Davivienda';
            localStorage.removeItem('selectedAccount');
        }
    };
    AuthorizeConsentComponent.prototype.ConsumoTX = function () {
        var dialogRef = this.dialog.open(pop_up_authorize_access_component_1.PopUpAuthorizeAccessComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            console.log("Dialog result: " + result);
        });
    };
    __decorate([
        core_1.Input()
    ], AuthorizeConsentComponent.prototype, "nombreCuentaOrigen");
    __decorate([
        core_1.Input()
    ], AuthorizeConsentComponent.prototype, "tipoDocumentoOrigen");
    __decorate([
        core_1.Input()
    ], AuthorizeConsentComponent.prototype, "numDocumentoOrigen");
    __decorate([
        core_1.Input()
    ], AuthorizeConsentComponent.prototype, "BancoOrigen");
    __decorate([
        core_1.Input()
    ], AuthorizeConsentComponent.prototype, "nombreCuentaDestino");
    __decorate([
        core_1.Input()
    ], AuthorizeConsentComponent.prototype, "tipoDocumentoDestino");
    __decorate([
        core_1.Input()
    ], AuthorizeConsentComponent.prototype, "numDocumentoDestino");
    __decorate([
        core_1.Input()
    ], AuthorizeConsentComponent.prototype, "BancoDestino");
    AuthorizeConsentComponent = __decorate([
        core_1.Component({
            selector: 'app-authorize-consent',
            templateUrl: './authorize-consent.component.html',
            styleUrls: ['./authorize-consent.component.scss']
        })
    ], AuthorizeConsentComponent);
    return AuthorizeConsentComponent;
}());
exports.AuthorizeConsentComponent = AuthorizeConsentComponent;

//# sourceMappingURL=authorize-consent.component.js.map
