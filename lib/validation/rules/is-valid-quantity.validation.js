"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidQuantityValidation = void 0;
var error_1 = require("../../error");
var generic_validations_1 = require("../generic-validations");
var IsValidQuantityValidation = /** @class */ (function () {
    function IsValidQuantityValidation() {
    }
    IsValidQuantityValidation.prototype.validate = function (props) {
        var result = (0, generic_validations_1.validateQuantity)(props.rule.quantity);
        if (result) {
            throw new error_1.QuantityIsInvalidInRuleError(result, props.rule.name);
        }
    };
    return IsValidQuantityValidation;
}());
exports.IsValidQuantityValidation = IsValidQuantityValidation;
