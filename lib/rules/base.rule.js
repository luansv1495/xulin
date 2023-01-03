"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRule = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
var utils_1 = require("../utils");
var validation_1 = require("../validation");
var rule_model_1 = require("./rule.model");
var BaseRule = /** @class */ (function () {
    function BaseRule(rule) {
        this.verifyMessage = '';
        this.validations = [
            new validation_1.IsNotObjectValidation(),
            new validation_1.NameIsRequiredValidation(),
            new validation_1.NameIsNotAStringValidation(),
            new validation_1.ContainsExpectedRuleNamesValidation(),
            new validation_1.SkipIsNotABooleanValidation()
        ];
        this.rule = rule;
    }
    BaseRule.prototype.validate = function (props) {
        this.validations.forEach(function (validation) {
            return validation.validate(props);
        });
    };
    /* istanbul ignore next */
    BaseRule.prototype.customVerify = function (rootDir) {
        /* istanbul ignore next */
        return {
            state: rule_model_1.VerifyStateEnum.skipped,
            passed: 0,
            failed: 0
        };
    };
    BaseRule.prototype.verify = function (rootDir) {
        if (this.rule.skip === true) {
            utils_1.Logger.handler(rule_model_1.VerifyStateEnum.skipped, this.verifyMessage);
            return {
                state: rule_model_1.VerifyStateEnum.skipped,
                passed: 0,
                failed: 0
            };
        }
        return this.customVerify(rootDir);
    };
    return BaseRule;
}());
exports.BaseRule = BaseRule;
