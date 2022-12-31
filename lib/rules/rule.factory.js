"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleFactory = void 0;
var base_rule_1 = require("./base.rule");
var filename_pattern_in_folder_1 = require("./filename-pattern-in-folder");
var rule_model_1 = require("./rule.model");
var RuleFactory = /** @class */ (function () {
    function RuleFactory(rule, rootDir) {
        var _this = this;
        this.rule = rule;
        this.rootDir = rootDir;
        this.validate = function () {
            new base_rule_1.BaseRule(_this.rule).validate({
                rule: _this.rule,
                rootDir: _this.rootDir,
                expectedFields: Object.values(rule_model_1.RuleNameEnum)
            });
            if (_this.rule.name === rule_model_1.RuleNameEnum.filenamePatternInFolder) {
                new filename_pattern_in_folder_1.FilenamePatternInFolderRule(_this.rule).validate({
                    rule: _this.rule,
                    rootDir: _this.rootDir,
                    expectedFields: Object.values(filename_pattern_in_folder_1.FilenamePatternInFolderProps).concat(Object.values(rule_model_1.RuleProps))
                });
            }
        };
        this.verify = function () {
            var state = rule_model_1.VerifyStateEnum.skipped;
            if (_this.rule.name === rule_model_1.RuleNameEnum.filenamePatternInFolder) {
                state = new filename_pattern_in_folder_1.FilenamePatternInFolderRule(_this.rule).verify(_this.rootDir);
            }
            return state;
        };
    }
    return RuleFactory;
}());
exports.RuleFactory = RuleFactory;
