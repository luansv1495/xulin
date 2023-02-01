"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidFolderListValidation = void 0;
var error_1 = require("../../error");
var generic_validations_1 = require("../generic-validations");
var IsValidFolderListValidation = /** @class */ (function () {
    function IsValidFolderListValidation() {
    }
    IsValidFolderListValidation.prototype.validate = function (props) {
        var result = (0, generic_validations_1.validateArray)(props.rule.folders);
        if (result) {
            throw new error_1.FolderInListIsInvalidInRuleError(result, props.rule.name);
        }
        props.rule.folders.forEach(function (folder) {
            var result = (0, generic_validations_1.validateFolder)(props.rootDir, folder);
            if (result) {
                throw new error_1.FolderInListIsInvalidInRuleError(result, props.rule.name);
            }
        });
    };
    return IsValidFolderListValidation;
}());
exports.IsValidFolderListValidation = IsValidFolderListValidation;
