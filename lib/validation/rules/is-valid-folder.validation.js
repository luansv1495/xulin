"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidFolderValidation = void 0;
var error_1 = require("../../error");
var generic_validations_1 = require("../generic-validations");
var IsValidFolderValidation = /** @class */ (function () {
    function IsValidFolderValidation() {
    }
    IsValidFolderValidation.prototype.validate = function (props) {
        var result = (0, generic_validations_1.validateFolder)(props.rootDir, props.rule.folder);
        if (result) {
            throw new error_1.FolderIsInvalidInRuleError(result, props.rule.name);
        }
    };
    return IsValidFolderValidation;
}());
exports.IsValidFolderValidation = IsValidFolderValidation;
