"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilenamePatternInFolderRule = void 0;
var kleur_1 = require("kleur");
var error_1 = require("../../error");
var utils_1 = require("../../utils");
var validation_1 = require("../../validation");
var base_rule_1 = require("../base.rule");
var rule_model_1 = require("../rule.model");
var FilenamePatternInFolderRule = /** @class */ (function (_super) {
    __extends(FilenamePatternInFolderRule, _super);
    function FilenamePatternInFolderRule(rule) {
        var _this = _super.call(this, rule) || this;
        _this.validations = [
            new validation_1.ContainsUnexpectFieldValidation(),
            new validation_1.ContainsRequiredFieldsValidation(),
            new validation_1.IsValidFolderValidation(),
            new validation_1.IsValidFilenamePatternValidation()
        ];
        _this.getInvalidFilesInFolder = function (filesInFolder, validFilesInFolder) {
            var invalidFiles = filesInFolder.filter(function (fileInFolder) {
                if (!validFilesInFolder.includes(fileInFolder)) {
                    return true;
                }
                return false;
            });
            return invalidFiles;
        };
        if (rule.patterns) {
            _this.verifyMessage = "Files in ".concat((0, kleur_1.grey)(rule.folder), " should contains ").concat((0, kleur_1.grey)(rule.patterns.join(',')), ".");
        }
        return _this;
    }
    FilenamePatternInFolderRule.prototype.customVerify = function (rootDir) {
        var _this = this;
        var filesInFolder = utils_1.FileSystem.getFilesInFolder(rootDir, this.rule.folder, []);
        var validFilesInFolder = utils_1.FileSystem.getFilesByPatternInFolder(rootDir, this.rule.folder, this.rule.patterns);
        var invalidFilesInFolder = this.getInvalidFilesInFolder(filesInFolder, validFilesInFolder);
        if (invalidFilesInFolder.length != 0) {
            utils_1.Logger.handler(rule_model_1.VerifyStateEnum.failed, this.verifyMessage);
            invalidFilesInFolder.forEach(function (invalidFile) {
                new error_1.FilePatternNotMatchInRuleError(invalidFile, _this.rule.name).showError(1);
            });
            return {
                state: rule_model_1.VerifyStateEnum.failed,
                passed: validFilesInFolder.length,
                failed: invalidFilesInFolder.length
            };
        }
        else {
            utils_1.Logger.handler(rule_model_1.VerifyStateEnum.passed, this.verifyMessage);
            return {
                state: rule_model_1.VerifyStateEnum.passed,
                passed: validFilesInFolder.length,
                failed: invalidFilesInFolder.length
            };
        }
    };
    return FilenamePatternInFolderRule;
}(base_rule_1.BaseRule));
exports.FilenamePatternInFolderRule = FilenamePatternInFolderRule;
