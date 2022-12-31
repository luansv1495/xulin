"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainsUnexpectFieldValidation = void 0;
var error_1 = require("../../error");
var ContainsUnexpectFieldValidation = /** @class */ (function () {
    function ContainsUnexpectFieldValidation() {
    }
    ContainsUnexpectFieldValidation.prototype.validate = function (props) {
        Object.keys(props.rule).forEach(function (received) {
            if (!props.expectedFields.includes(received)) {
                throw new error_1.UnexpectFieldInRuleError(received, props.rule.name);
            }
        });
    };
    return ContainsUnexpectFieldValidation;
}());
exports.ContainsUnexpectFieldValidation = ContainsUnexpectFieldValidation;
