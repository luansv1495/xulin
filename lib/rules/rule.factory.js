"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleFactory = void 0;
var base_rule_1 = require("./base.rule");
var filename_pattern_in_folder_1 = require("./filename-pattern-in-folder");
var filename_size_in_folder_1 = require("./filename-size-in-folder");
var folder_name_in_folder_1 = require("./folder-name-in-folder");
var max_files_in_folder_1 = require("./max-files-in-folder");
var max_folders_in_folder_1 = require("./max-folders-in-folder");
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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            var _a = _this.rule, skip = _a.skip, rest = __rest(_a, ["skip"]);
            if (_this.rule.name === rule_model_1.RuleNameEnum.filenamePatternInFolder) {
                new filename_pattern_in_folder_1.FilenamePatternInFolderRule(_this.rule).validate({
                    rule: rest,
                    rootDir: _this.rootDir,
                    expectedFields: Object.values(filename_pattern_in_folder_1.FilenamePatternInFolderProps)
                });
            }
            else if (_this.rule.name === rule_model_1.RuleNameEnum.folderNameInFolder) {
                new folder_name_in_folder_1.FolderNameInFolderRule(_this.rule).validate({
                    rule: rest,
                    rootDir: _this.rootDir,
                    expectedFields: Object.values(folder_name_in_folder_1.FolderNameInFolderProps)
                });
            }
            else if (_this.rule.name === rule_model_1.RuleNameEnum.maxFilesInFolder) {
                new max_files_in_folder_1.MaxFilesInFolderRule(_this.rule).validate({
                    rule: rest,
                    rootDir: _this.rootDir,
                    expectedFields: Object.values(max_files_in_folder_1.MaxFilesInFolderProps)
                });
            }
            else if (_this.rule.name === rule_model_1.RuleNameEnum.maxFoldersInFolder) {
                new max_folders_in_folder_1.MaxFoldersInFolderRule(_this.rule).validate({
                    rule: rest,
                    rootDir: _this.rootDir,
                    expectedFields: Object.values(max_folders_in_folder_1.MaxFoldersInFolderProps)
                });
            }
            else if (_this.rule.name === rule_model_1.RuleNameEnum.filenameSizeInFolder) {
                new filename_size_in_folder_1.FilenameSizeInFolderRule(_this.rule).validate({
                    rule: rest,
                    rootDir: _this.rootDir,
                    expectedFields: Object.values(filename_size_in_folder_1.FilenameSizeInFolderProps)
                });
            }
        };
        this.verify = function () {
            var state = {
                state: rule_model_1.VerifyStateEnum.skipped,
                passed: 0,
                failed: 0
            };
            if (_this.rule.name === rule_model_1.RuleNameEnum.filenamePatternInFolder) {
                state = new filename_pattern_in_folder_1.FilenamePatternInFolderRule(_this.rule).verify(_this.rootDir);
            }
            else if (_this.rule.name === rule_model_1.RuleNameEnum.folderNameInFolder) {
                state = new folder_name_in_folder_1.FolderNameInFolderRule(_this.rule).verify(_this.rootDir);
            }
            else if (_this.rule.name === rule_model_1.RuleNameEnum.maxFilesInFolder) {
                state = new max_files_in_folder_1.MaxFilesInFolderRule(_this.rule).verify(_this.rootDir);
            }
            else if (_this.rule.name === rule_model_1.RuleNameEnum.maxFoldersInFolder) {
                state = new max_folders_in_folder_1.MaxFoldersInFolderRule(_this.rule).verify(_this.rootDir);
            }
            else if (_this.rule.name === rule_model_1.RuleNameEnum.filenameSizeInFolder) {
                state = new filename_size_in_folder_1.FilenameSizeInFolderRule(_this.rule).verify(_this.rootDir);
            }
            return state;
        };
    }
    return RuleFactory;
}());
exports.RuleFactory = RuleFactory;
