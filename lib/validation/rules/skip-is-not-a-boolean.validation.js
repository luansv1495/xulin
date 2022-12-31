"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipIsNotABooleanValidation = void 0;
var error_1 = require("../../error");
var SkipIsNotABooleanValidation = /** @class */ (function () {
    function SkipIsNotABooleanValidation() {
    }
    SkipIsNotABooleanValidation.prototype.validate = function (props) {
        if (!!props.rule.skip && typeof props.rule.skip != 'boolean') {
            throw new error_1.RuleSkipIsNotBooleanError(props.rule.skip);
        }
    };
    return SkipIsNotABooleanValidation;
}());
exports.SkipIsNotABooleanValidation = SkipIsNotABooleanValidation;
