"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidMaxMinValidation = void 0;
var error_1 = require("../../error");
var generic_validations_1 = require("../generic-validations");
var IsValidMaxMinValidation = /** @class */ (function () {
    function IsValidMaxMinValidation() {
    }
    IsValidMaxMinValidation.prototype.validate = function (props) {
        var maxResult = (0, generic_validations_1.validateQuantity)(props.rule.max);
        var minResult = (0, generic_validations_1.validateQuantity)(props.rule.min);
        var maxMinResult = (0, generic_validations_1.validateMaxMin)(props.rule.max, props.rule.min);
        if (maxResult) {
            throw new error_1.MaxMinIsInvalidInRuleError(maxResult, props.rule.name, 'max');
        }
        else if (minResult) {
            throw new error_1.MaxMinIsInvalidInRuleError(minResult, props.rule.name, 'min');
        }
        else if (maxMinResult) {
            throw new error_1.MaxMinIsInvalidInRuleError(maxMinResult, props.rule.name, 'min');
        }
    };
    return IsValidMaxMinValidation;
}());
exports.IsValidMaxMinValidation = IsValidMaxMinValidation;
