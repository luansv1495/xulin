"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidFolderNameValidation = void 0;
var error_1 = require("../../error");
var generic_validations_1 = require("../generic-validations");
var IsValidFolderNameValidation = /** @class */ (function () {
    function IsValidFolderNameValidation() {
    }
    IsValidFolderNameValidation.prototype.validate = function (props) {
        props.rule.names.forEach(function (name) {
            var result = (0, generic_validations_1.validateFoldername)(name);
            if (result) {
                throw new error_1.FolderNameIsInvalidInRuleError(result, props.rule.name);
            }
        });
    };
    return IsValidFolderNameValidation;
}());
exports.IsValidFolderNameValidation = IsValidFolderNameValidation;
