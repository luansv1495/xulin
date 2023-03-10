"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyStateEnum = exports.RuleNameEnum = exports.RuleProps = void 0;
var RuleProps;
(function (RuleProps) {
    RuleProps["name"] = "name";
    RuleProps["skip"] = "skip";
})(RuleProps = exports.RuleProps || (exports.RuleProps = {}));
var RuleNameEnum;
(function (RuleNameEnum) {
    RuleNameEnum["filenamePatternInFolder"] = "filename-pattern-in-folder";
    RuleNameEnum["folderNameInFolder"] = "folder-name-in-folder";
    RuleNameEnum["maxFilesInFolder"] = "max-files-in-folder";
    RuleNameEnum["maxFoldersInFolder"] = "max-folders-in-folder";
    RuleNameEnum["filenameSizeInFolder"] = "filename-size-in-folder";
    RuleNameEnum["folderNameSizeInFolder"] = "folder-name-size-in-folder";
    RuleNameEnum["noDependencies"] = "no-dependencies";
})(RuleNameEnum = exports.RuleNameEnum || (exports.RuleNameEnum = {}));
var VerifyStateEnum;
(function (VerifyStateEnum) {
    VerifyStateEnum["skipped"] = "skipped";
    VerifyStateEnum["passed"] = "passed";
    VerifyStateEnum["failed"] = "failed";
})(VerifyStateEnum = exports.VerifyStateEnum || (exports.VerifyStateEnum = {}));
