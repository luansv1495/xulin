"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameIsRequiredValidation = void 0;
var error_1 = require("../../error");
var NameIsRequiredValidation = /** @class */ (function () {
    function NameIsRequiredValidation() {
    }
    NameIsRequiredValidation.prototype.validate = function (props) {
        if (!props.rule.name) {
            throw new error_1.RuleNameIsRequiredError(props.rule);
        }
    };
    return NameIsRequiredValidation;
}());
exports.NameIsRequiredValidation = NameIsRequiredValidation;
