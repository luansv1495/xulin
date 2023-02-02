"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidFilenamePatternValidation = void 0;
var error_1 = require("../../error");
var generic_validations_1 = require("../generic-validations");
var IsValidFilenamePatternValidation = /** @class */ (function () {
    function IsValidFilenamePatternValidation() {
    }
    IsValidFilenamePatternValidation.prototype.validate = function (props) {
        var result = (0, generic_validations_1.validateArray)(props.rule.patterns);
        if (result) {
            throw new error_1.PatternsIsInvalidInRuleError(result, props.rule.name);
        }
        props.rule.patterns.forEach(function (pattern) {
            var result = (0, generic_validations_1.validateFilenamePattern)(pattern);
            if (result) {
                throw new error_1.PatternsIsInvalidInRuleError(result, props.rule.name);
            }
        });
    };
    return IsValidFilenamePatternValidation;
}());
exports.IsValidFilenamePatternValidation = IsValidFilenamePatternValidation;
