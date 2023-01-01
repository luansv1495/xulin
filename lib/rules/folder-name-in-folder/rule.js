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
exports.FolderNameInFolderRule = void 0;
var kleur_1 = require("kleur");
var error_1 = require("../../error");
var utils_1 = require("../../utils");
var validation_1 = require("../../validation");
var base_rule_1 = require("../base.rule");
var rule_model_1 = require("../rule.model");
var FolderNameInFolderRule = /** @class */ (function (_super) {
    __extends(FolderNameInFolderRule, _super);
    function FolderNameInFolderRule(rule) {
        var _this = _super.call(this, rule) || this;
        _this.validations = [
            new validation_1.ContainsUnexpectFieldValidation(),
            new validation_1.ContainsRequiredFieldsValidation(),
            new validation_1.IsValidFolderValidation(),
            new validation_1.IsValidFolderNameValidation()
        ];
        _this.getInvalidFolderInFolder = function (foldersInFolder) {
            var invalidFolders = foldersInFolder.filter(function (folder) {
                if (!_this.rule.names.includes(folder)) {
                    return true;
                }
                return false;
            });
            return invalidFolders;
        };
        if (rule.names) {
            _this.verifyMessage = "Folder in ".concat((0, kleur_1.grey)(rule.folder), " should must contain one of the names ").concat((0, kleur_1.grey)(rule.names.join(',')), ".");
        }
        return _this;
    }
    FolderNameInFolderRule.prototype.customVerify = function (rootDir) {
        var _this = this;
        var foldersInFolder = utils_1.FileSystem.getFoldersInFolder(rootDir, this.rule.folder);
        var invalidFolders = this.getInvalidFolderInFolder(foldersInFolder);
        if (invalidFolders.length != 0) {
            utils_1.Logger.handler(rule_model_1.VerifyStateEnum.failed, this.verifyMessage);
            invalidFolders.forEach(function (folder) {
                new error_1.FolderNameNotMatchInRuleError(folder, _this.rule.name).showError(1);
            });
            return rule_model_1.VerifyStateEnum.failed;
        }
        else {
            utils_1.Logger.handler(rule_model_1.VerifyStateEnum.passed, this.verifyMessage);
            return rule_model_1.VerifyStateEnum.passed;
        }
    };
    return FolderNameInFolderRule;
}(base_rule_1.BaseRule));
exports.FolderNameInFolderRule = FolderNameInFolderRule;
