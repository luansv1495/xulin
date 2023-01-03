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
exports.FilenameSizeInFolderRule = void 0;
var kleur_1 = require("kleur");
var error_1 = require("../../error");
var utils_1 = require("../../utils");
var validation_1 = require("../../validation");
var base_rule_1 = require("../base.rule");
var rule_model_1 = require("../rule.model");
var FilenameSizeInFolderRule = /** @class */ (function (_super) {
    __extends(FilenameSizeInFolderRule, _super);
    function FilenameSizeInFolderRule(rule) {
        var _this = _super.call(this, rule) || this;
        _this.validations = [
            new validation_1.ContainsUnexpectFieldValidation(),
            new validation_1.ContainsRequiredFieldsValidation(),
            new validation_1.IsValidFolderValidation(),
            new validation_1.IsValidMaxMinValidation()
        ];
        _this.getValidFiles = function (filesInFolder) {
            var validFiles = filesInFolder.filter(function (file) {
                var length = utils_1.FileSystem.getFilename(file).length;
                return length >= _this.rule.min && length <= _this.rule.max;
            });
            return validFiles;
        };
        _this.getInvalidFiles = function (filesInFolder, validFiles) {
            var invalidFiles = filesInFolder.filter(function (file) { return !validFiles.includes(file); });
            return invalidFiles;
        };
        if (rule.min != undefined && rule.max != undefined) {
            _this.verifyMessage = "Filenames must contain a minimum of ".concat((0, kleur_1.grey)(rule.min), " characters and a maximum of ").concat((0, kleur_1.grey)(rule.max), " characters in ").concat((0, kleur_1.grey)(rule.folder), " folder.");
        }
        return _this;
    }
    FilenameSizeInFolderRule.prototype.customVerify = function (rootDir) {
        var _this = this;
        var filesInFolder = utils_1.FileSystem.getDeepFilesInFolder(rootDir, this.rule.folder, []);
        var validFiles = this.getValidFiles(filesInFolder);
        var invalidFiles = this.getInvalidFiles(filesInFolder, validFiles);
        if (invalidFiles.length != 0) {
            utils_1.Logger.handler(rule_model_1.VerifyStateEnum.failed, this.verifyMessage);
            invalidFiles.forEach(function (invalidFile) {
                new error_1.FilenameSizeInRuleError(invalidFile, _this.rule.name).showError(1);
            });
            return {
                state: rule_model_1.VerifyStateEnum.failed,
                passed: validFiles.length,
                failed: invalidFiles.length
            };
        }
        else {
            utils_1.Logger.handler(rule_model_1.VerifyStateEnum.passed, this.verifyMessage);
            return {
                state: rule_model_1.VerifyStateEnum.passed,
                passed: validFiles.length,
                failed: invalidFiles.length
            };
        }
    };
    return FilenameSizeInFolderRule;
}(base_rule_1.BaseRule));
exports.FilenameSizeInFolderRule = FilenameSizeInFolderRule;
