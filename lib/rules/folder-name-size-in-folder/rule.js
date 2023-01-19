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
exports.FolderNameSizeInFolderRule = void 0;
var kleur_1 = require("kleur");
var error_1 = require("../../error");
var utils_1 = require("../../utils");
var validation_1 = require("../../validation");
var base_rule_1 = require("../base.rule");
var rule_model_1 = require("../rule.model");
var FolderNameSizeInFolderRule = /** @class */ (function (_super) {
    __extends(FolderNameSizeInFolderRule, _super);
    function FolderNameSizeInFolderRule(rule) {
        var _this = _super.call(this, rule) || this;
        _this.validations = [
            new validation_1.ContainsUnexpectFieldValidation(),
            new validation_1.ContainsRequiredFieldsValidation(),
            new validation_1.IsValidFolderValidation(),
            new validation_1.IsValidMaxMinValidation()
        ];
        _this.getValidFolders = function (foldersInFolder) {
            var validFolders = foldersInFolder.filter(function (folder) {
                var length = utils_1.FileSystem.getFolderName(folder).length;
                return length >= _this.rule.min && length <= _this.rule.max;
            });
            return validFolders;
        };
        _this.getInvalidFolders = function (foldersInFolder, validFolders) {
            var invalidFolders = foldersInFolder.filter(function (folder) { return !validFolders.includes(folder); });
            return invalidFolders;
        };
        if (rule.min != undefined && rule.max != undefined) {
            _this.verifyMessage = "Folders names must contain a minimum of ".concat((0, kleur_1.grey)(rule.min), " characters and a maximum of ").concat((0, kleur_1.grey)(rule.max), " characters in ").concat((0, kleur_1.grey)(rule.folder), " folder.");
        }
        return _this;
    }
    FolderNameSizeInFolderRule.prototype.customVerify = function (rootDir) {
        var _this = this;
        var foldersInFolder = utils_1.FileSystem.getDeepFoldersInFolder(rootDir, this.rule.folder, []);
        var validFolders = this.getValidFolders(foldersInFolder);
        var invalidFolders = this.getInvalidFolders(foldersInFolder, validFolders);
        if (invalidFolders.length != 0) {
            utils_1.Logger.handler(rule_model_1.VerifyStateEnum.failed, this.verifyMessage);
            invalidFolders.forEach(function (invalidFolder) {
                new error_1.FolderNameSizeInRuleError(invalidFolder, _this.rule.name).showError(1);
            });
            return {
                state: rule_model_1.VerifyStateEnum.failed,
                passed: validFolders.length,
                failed: invalidFolders.length
            };
        }
        else {
            utils_1.Logger.handler(rule_model_1.VerifyStateEnum.passed, this.verifyMessage);
            return {
                state: rule_model_1.VerifyStateEnum.passed,
                passed: validFolders.length,
                failed: invalidFolders.length
            };
        }
    };
    return FolderNameSizeInFolderRule;
}(base_rule_1.BaseRule));
exports.FolderNameSizeInFolderRule = FolderNameSizeInFolderRule;
