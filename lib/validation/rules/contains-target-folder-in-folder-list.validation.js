"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainsTargetFolderInFolderListValidation = void 0;
var error_1 = require("../../error");
var ContainsTargetFolderInFolderListValidation = /** @class */ (function () {
    function ContainsTargetFolderInFolderListValidation() {
    }
    ContainsTargetFolderInFolderListValidation.prototype.validate = function (props) {
        if (props.rule.folders.includes(props.rule.folder)) {
            throw new error_1.FolderInListIsEqualToTargetFolderInRuleError("\"".concat(props.rule.folder, "\" is equal the target folder."), props.rule.name);
        }
    };
    return ContainsTargetFolderInFolderListValidation;
}());
exports.ContainsTargetFolderInFolderListValidation = ContainsTargetFolderInFolderListValidation;
