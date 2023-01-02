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
exports.QuantityIsInvalidInRuleError = exports.FolderNameNotMatchInRuleError = exports.FolderNameIsInvalidInRuleError = exports.FilePatternNotMatchInRuleError = exports.PatternsIsInvalidInRuleError = exports.FolderIsInvalidInRuleError = exports.FieldIsRequiredInRuleError = exports.UnexpectFieldInRuleError = exports.RuleSkipIsNotBooleanError = exports.RuleNameNotRecognizeError = exports.RuleNameIsNotStringError = exports.RuleNameIsRequiredError = exports.RuleIsInvalidError = exports.RuleIsNotArrayError = void 0;
var base_error_1 = require("./base.error");
var kleur_1 = require("kleur");
var RuleError = /** @class */ (function (_super) {
    __extends(RuleError, _super);
    function RuleError(message) {
        /* istanbul ignore next */
        return _super.call(this, message, 'RuleError') || this;
    }
    return RuleError;
}(base_error_1.BaseError));
var RuleIsNotArrayError = /** @class */ (function (_super) {
    __extends(RuleIsNotArrayError, _super);
    function RuleIsNotArrayError() {
        /* istanbul ignore next */
        return _super.call(this, 'Field [rules] is not a array.') || this;
    }
    return RuleIsNotArrayError;
}(RuleError));
exports.RuleIsNotArrayError = RuleIsNotArrayError;
var RuleIsInvalidError = /** @class */ (function (_super) {
    __extends(RuleIsInvalidError, _super);
    function RuleIsInvalidError(rule) {
        /* istanbul ignore next */
        return _super.call(this, "Rule [".concat(JSON.stringify(rule), "] is invalid.")) || this;
    }
    return RuleIsInvalidError;
}(RuleError));
exports.RuleIsInvalidError = RuleIsInvalidError;
var RuleNameIsRequiredError = /** @class */ (function (_super) {
    __extends(RuleNameIsRequiredError, _super);
    function RuleNameIsRequiredError(rule) {
        /* istanbul ignore next */
        return _super.call(this, "Rule name is required in: ".concat(JSON.stringify(rule), ".")) || this;
    }
    return RuleNameIsRequiredError;
}(RuleError));
exports.RuleNameIsRequiredError = RuleNameIsRequiredError;
var RuleNameIsNotStringError = /** @class */ (function (_super) {
    __extends(RuleNameIsNotStringError, _super);
    function RuleNameIsNotStringError(ruleName) {
        /* istanbul ignore next */
        return _super.call(this, "Rule name \"".concat(ruleName, "\" is not a string.")) || this;
    }
    return RuleNameIsNotStringError;
}(RuleError));
exports.RuleNameIsNotStringError = RuleNameIsNotStringError;
var RuleNameNotRecognizeError = /** @class */ (function (_super) {
    __extends(RuleNameNotRecognizeError, _super);
    function RuleNameNotRecognizeError(ruleName) {
        /* istanbul ignore next */
        return _super.call(this, "Rule \"".concat(ruleName, "\" not recognize.")) || this;
    }
    return RuleNameNotRecognizeError;
}(RuleError));
exports.RuleNameNotRecognizeError = RuleNameNotRecognizeError;
var RuleSkipIsNotBooleanError = /** @class */ (function (_super) {
    __extends(RuleSkipIsNotBooleanError, _super);
    function RuleSkipIsNotBooleanError(ruleSkip) {
        /* istanbul ignore next */
        return _super.call(this, "Rule field skip with value \"".concat(ruleSkip, "\" is not a boolean.")) || this;
    }
    return RuleSkipIsNotBooleanError;
}(RuleError));
exports.RuleSkipIsNotBooleanError = RuleSkipIsNotBooleanError;
var UnexpectFieldInRuleError = /** @class */ (function (_super) {
    __extends(UnexpectFieldInRuleError, _super);
    function UnexpectFieldInRuleError(field, ruleName) {
        /* istanbul ignore next */
        return _super.call(this, "Unexpected field \"".concat(field, "\". In ").concat(ruleName, " rule.")) || this;
    }
    return UnexpectFieldInRuleError;
}(RuleError));
exports.UnexpectFieldInRuleError = UnexpectFieldInRuleError;
var FieldIsRequiredInRuleError = /** @class */ (function (_super) {
    __extends(FieldIsRequiredInRuleError, _super);
    function FieldIsRequiredInRuleError(field, ruleName) {
        /* istanbul ignore next */
        return _super.call(this, "Field \"".concat(field, "\" is required. In ").concat(ruleName, " rule.")) || this;
    }
    return FieldIsRequiredInRuleError;
}(RuleError));
exports.FieldIsRequiredInRuleError = FieldIsRequiredInRuleError;
var FolderIsInvalidInRuleError = /** @class */ (function (_super) {
    __extends(FolderIsInvalidInRuleError, _super);
    function FolderIsInvalidInRuleError(result, ruleName) {
        /* istanbul ignore next */
        return _super.call(this, "Field folder with value ".concat(result, " In ").concat(ruleName, " rule.")) || this;
    }
    return FolderIsInvalidInRuleError;
}(RuleError));
exports.FolderIsInvalidInRuleError = FolderIsInvalidInRuleError;
var PatternsIsInvalidInRuleError = /** @class */ (function (_super) {
    __extends(PatternsIsInvalidInRuleError, _super);
    function PatternsIsInvalidInRuleError(result, ruleName) {
        /* istanbul ignore next */
        return _super.call(this, "Pattern with value ".concat(result, " In ").concat(ruleName, " rule.")) || this;
    }
    return PatternsIsInvalidInRuleError;
}(RuleError));
exports.PatternsIsInvalidInRuleError = PatternsIsInvalidInRuleError;
var FilePatternNotMatchInRuleError = /** @class */ (function (_super) {
    __extends(FilePatternNotMatchInRuleError, _super);
    function FilePatternNotMatchInRuleError(fileName, ruleName) {
        /* istanbul ignore next */
        return _super.call(this, "".concat((0, kleur_1.grey)(ruleName), ": File ").concat((0, kleur_1.grey)(fileName), " not match.")) || this;
    }
    return FilePatternNotMatchInRuleError;
}(RuleError));
exports.FilePatternNotMatchInRuleError = FilePatternNotMatchInRuleError;
var FolderNameIsInvalidInRuleError = /** @class */ (function (_super) {
    __extends(FolderNameIsInvalidInRuleError, _super);
    function FolderNameIsInvalidInRuleError(result, ruleName) {
        /* istanbul ignore next */
        return _super.call(this, "Folder name with value ".concat(result, " In ").concat(ruleName, " rule.")) || this;
    }
    return FolderNameIsInvalidInRuleError;
}(RuleError));
exports.FolderNameIsInvalidInRuleError = FolderNameIsInvalidInRuleError;
var FolderNameNotMatchInRuleError = /** @class */ (function (_super) {
    __extends(FolderNameNotMatchInRuleError, _super);
    function FolderNameNotMatchInRuleError(folderName, ruleName) {
        /* istanbul ignore next */
        return _super.call(this, "".concat((0, kleur_1.grey)(ruleName), ": Folder ").concat((0, kleur_1.grey)(folderName), " not match.")) || this;
    }
    return FolderNameNotMatchInRuleError;
}(RuleError));
exports.FolderNameNotMatchInRuleError = FolderNameNotMatchInRuleError;
var QuantityIsInvalidInRuleError = /** @class */ (function (_super) {
    __extends(QuantityIsInvalidInRuleError, _super);
    function QuantityIsInvalidInRuleError(result, ruleName) {
        /* istanbul ignore next */
        return _super.call(this, "Field quantity with value ".concat(result, " In ").concat(ruleName, " rule.")) || this;
    }
    return QuantityIsInvalidInRuleError;
}(RuleError));
exports.QuantityIsInvalidInRuleError = QuantityIsInvalidInRuleError;
