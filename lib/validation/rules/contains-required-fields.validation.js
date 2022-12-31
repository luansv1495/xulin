"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainsRequiredFieldsValidation = void 0;
var error_1 = require("../../error");
var ContainsRequiredFieldsValidation = /** @class */ (function () {
    function ContainsRequiredFieldsValidation() {
    }
    ContainsRequiredFieldsValidation.prototype.validate = function (props) {
        props.expectedFields.forEach(function (expected) {
            if (!Object.keys(props.rule).includes(expected)) {
                throw new error_1.FieldIsRequiredInRuleError(expected, props.rule.name);
            }
        });
    };
    return ContainsRequiredFieldsValidation;
}());
exports.ContainsRequiredFieldsValidation = ContainsRequiredFieldsValidation;
