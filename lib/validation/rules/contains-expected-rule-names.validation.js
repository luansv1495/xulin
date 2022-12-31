"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainsExpectedRuleNamesValidation = void 0;
var error_1 = require("../../error");
var ContainsExpectedRuleNamesValidation = /** @class */ (function () {
    function ContainsExpectedRuleNamesValidation() {
    }
    ContainsExpectedRuleNamesValidation.prototype.validate = function (props) {
        if (!props.expectedFields.includes(props.rule.name)) {
            throw new error_1.RuleNameNotRecognizeError(props.rule.name);
        }
    };
    return ContainsExpectedRuleNamesValidation;
}());
exports.ContainsExpectedRuleNamesValidation = ContainsExpectedRuleNamesValidation;
