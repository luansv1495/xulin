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
exports.MaxFoldersInFolderRule = void 0;
var kleur_1 = require("kleur");
var utils_1 = require("../../utils");
var validation_1 = require("../../validation");
var base_rule_1 = require("../base.rule");
var rule_model_1 = require("../rule.model");
var MaxFoldersInFolderRule = /** @class */ (function (_super) {
    __extends(MaxFoldersInFolderRule, _super);
    function MaxFoldersInFolderRule(rule) {
        var _this = _super.call(this, rule) || this;
        _this.validations = [
            new validation_1.ContainsUnexpectFieldValidation(),
            new validation_1.ContainsRequiredFieldsValidation(),
            new validation_1.IsValidFolderValidation(),
            new validation_1.IsValidQuantityValidation()
        ];
        if (rule.quantity != undefined) {
            _this.verifyMessage = "Folder ".concat((0, kleur_1.grey)(rule.folder), " should contain ").concat((0, kleur_1.grey)(rule.quantity), " folders.");
        }
        return _this;
    }
    MaxFoldersInFolderRule.prototype.customVerify = function (rootDir) {
        var foldersInFolder = utils_1.FileSystem.getFoldersInFolder(rootDir, this.rule.folder);
        if (foldersInFolder.length > this.rule.quantity) {
            utils_1.Logger.handler(rule_model_1.VerifyStateEnum.failed, this.verifyMessage);
            return {
                state: rule_model_1.VerifyStateEnum.failed,
                passed: this.rule.quantity,
                failed: foldersInFolder.length - this.rule.quantity
            };
        }
        else {
            utils_1.Logger.handler(rule_model_1.VerifyStateEnum.passed, this.verifyMessage);
            return {
                state: rule_model_1.VerifyStateEnum.passed,
                passed: foldersInFolder.length,
                failed: 0
            };
        }
    };
    return MaxFoldersInFolderRule;
}(base_rule_1.BaseRule));
exports.MaxFoldersInFolderRule = MaxFoldersInFolderRule;
