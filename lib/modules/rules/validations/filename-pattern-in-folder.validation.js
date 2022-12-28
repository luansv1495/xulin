"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFilenamePatterInFolderRule = void 0;
var error_1 = require("../../../error");
var models_1 = require("../models");
var generic_validations_1 = require("./generic-validations");
var checkUnexpectdFields = function (receivedKeys, expectedKeys) {
    receivedKeys.forEach(function (receivedKey) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!expectedKeys.includes(receivedKey)) {
            throw new error_1.UnexpectFieldInRuleError(receivedKey, models_1.RuleNameEnum.filenamePatternInFolder);
        }
    });
};
var checkRequiredFields = function (receivedKeys, expectedKeys) {
    expectedKeys.forEach(function (expectedKey) {
        if (!receivedKeys.includes(expectedKey)) {
            throw new error_1.FieldIsRequiredInRuleError(expectedKey, models_1.RuleNameEnum.filenamePatternInFolder);
        }
    });
};
var checkFolderField = function (projectPath, folder) {
    var result = (0, generic_validations_1.validateFolder)(projectPath, folder);
    if (result) {
        throw new error_1.FolderIsInvalidInRuleError(result, models_1.RuleNameEnum.filenamePatternInFolder);
    }
};
var checkPatternsField = function (patterns) {
    patterns.forEach(function (pattern) {
        var result = (0, generic_validations_1.validateFilenamePattern)(pattern);
        if (result) {
            throw new error_1.PatternsIsInvalidInRuleError(result, models_1.RuleNameEnum.filenamePatternInFolder);
        }
    });
};
var validateFilenamePatterInFolderRule = function (projectPath, rule) {
    var receivedKeys = Object.keys(rule);
    var expectedKeys = Object.values(models_1.FilenamePatternInFolderRuleProps);
    checkUnexpectdFields(receivedKeys, expectedKeys);
    checkRequiredFields(receivedKeys, expectedKeys);
    checkFolderField(projectPath, rule.folder);
    checkPatternsField(rule.patterns);
};
exports.validateFilenamePatterInFolderRule = validateFilenamePatterInFolderRule;
