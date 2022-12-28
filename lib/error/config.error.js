"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectFieldInConfigError = exports.ConfigFileIsEmptyError = void 0;
var base_error_1 = require("./base.error");
var ConfigError = /** @class */ (function (_super) {
    __extends(ConfigError, _super);
    function ConfigError(message) {
        return _super.call(this, message, 'ConfigError') || this;
    }
    return ConfigError;
}(base_error_1.BaseError));
var ConfigFileIsEmptyError = /** @class */ (function (_super) {
    __extends(ConfigFileIsEmptyError, _super);
    function ConfigFileIsEmptyError() {
        return _super.call(this, 'Config file is empty.') || this;
    }
    return ConfigFileIsEmptyError;
}(ConfigError));
exports.ConfigFileIsEmptyError = ConfigFileIsEmptyError;
var UnexpectFieldInConfigError = /** @class */ (function (_super) {
    __extends(UnexpectFieldInConfigError, _super);
    function UnexpectFieldInConfigError(field) {
        return _super.call(this, "Unexpected field \"".concat(field, "\".")) || this;
    }
    return UnexpectFieldInConfigError;
}(ConfigError));
exports.UnexpectFieldInConfigError = UnexpectFieldInConfigError;
