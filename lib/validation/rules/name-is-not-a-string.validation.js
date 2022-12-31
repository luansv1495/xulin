"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameIsNotAStringValidation = void 0;
var error_1 = require("../../error");
var NameIsNotAStringValidation = /** @class */ (function () {
    function NameIsNotAStringValidation() {
    }
    NameIsNotAStringValidation.prototype.validate = function (props) {
        if (typeof props.rule.name != 'string') {
            throw new error_1.RuleNameIsNotStringError(props.rule.name);
        }
    };
    return NameIsNotAStringValidation;
}());
exports.NameIsNotAStringValidation = NameIsNotAStringValidation;
