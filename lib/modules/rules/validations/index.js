"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRulesField = void 0;
var error_1 = require("../../../error");
var models_1 = require("../models");
var filename_pattern_in_folder_validation_1 = require("./filename-pattern-in-folder.validation");
var validateRulesField = function (projectPath, rules) {
    if (Object.prototype.toString.call(rules) != '[object Array]') {
        throw new error_1.RuleIsNotArrayError();
    }
    var rulesList = rules;
    var expectedRuleNames = Object.values(models_1.RuleNameEnum);
    rulesList.forEach(function (rule) {
        if (Object.prototype.toString.call(rule) != '[object Object]') {
            throw new error_1.RuleIsInvalidError(rule);
        }
        else if (!rule.name) {
            throw new error_1.RuleNameIsRequiredError(rule);
        }
        else if (typeof rule.name != 'string') {
            throw new error_1.RuleNameIsNotStringError(rule.name);
        }
        else if (!expectedRuleNames.includes(rule.name)) {
            throw new error_1.RuleNameNotRecognizeError(rule.name);
        }
        else if (!!rule.skip && typeof rule.skip != 'boolean') {
            throw new error_1.RuleSkipIsNotBooleanError(rule.skip);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            var name_1 = rule.name, skip = rule.skip, rest = __rest(rule, ["name", "skip"]);
            if (name_1 === models_1.RuleNameEnum.filenamePatternInFolder) {
                (0, filename_pattern_in_folder_validation_1.validateFilenamePatterInFolderRule)(projectPath, __assign({}, rest));
            }
        }
    });
};
exports.validateRulesField = validateRulesField;
