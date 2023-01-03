"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainsUnexpectFieldValidation = void 0;
var error_1 = require("../../error");
var rule_model_1 = require("../../rules/rule.model");
var ContainsUnexpectFieldValidation = /** @class */ (function () {
    function ContainsUnexpectFieldValidation() {
    }
    ContainsUnexpectFieldValidation.prototype.validate = function (props) {
        Object.keys(props.rule).forEach(function (received) {
            if (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            !Object.values(rule_model_1.RuleProps).includes(received) &&
                !props.expectedFields.includes(received)) {
                throw new error_1.UnexpectFieldInRuleError(received, props.rule.name);
            }
        });
    };
    return ContainsUnexpectFieldValidation;
}());
exports.ContainsUnexpectFieldValidation = ContainsUnexpectFieldValidation;
