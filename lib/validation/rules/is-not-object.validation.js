"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNotObjectValidation = void 0;
var error_1 = require("../../error");
var IsNotObjectValidation = /** @class */ (function () {
    function IsNotObjectValidation() {
    }
    IsNotObjectValidation.prototype.validate = function (props) {
        if (Object.prototype.toString.call(props.rule) != '[object Object]') {
            throw new error_1.RuleIsInvalidError(props.rule);
        }
    };
    return IsNotObjectValidation;
}());
exports.IsNotObjectValidation = IsNotObjectValidation;
