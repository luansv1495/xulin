"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyFilenamePatternInFolder = void 0;
var fs_1 = require("fs");
var glob_1 = __importDefault(require("glob"));
var kleur_1 = require("kleur");
var path_1 = __importDefault(require("path"));
var models_1 = require("../models");
var utils_1 = require("../utils");
var error_1 = require("../../../error");
var getFilesInFolder = function (projectPath, folder, files) {
    var completeFolderPath = path_1.default.join(projectPath, folder);
    var items = (0, fs_1.readdirSync)(completeFolderPath, { withFileTypes: true });
    items.forEach(function (item) {
        if (item.isDirectory()) {
            files = getFilesInFolder(projectPath, path_1.default.join(completeFolderPath, item.name), files);
        }
        else {
            files.push(path_1.default.join(completeFolderPath, item.name));
        }
    });
    return files;
};
var getValidFilesInFolder = function (projectPath, rule) {
    var validFiles = [];
    rule.patterns.forEach(function (pattern) {
        var files = glob_1.default.sync(pattern, {
            root: path_1.default.join(projectPath, rule.folder)
        });
        validFiles = validFiles.concat(files);
    });
    return validFiles;
};
var getInvalidFilesInFolder = function (filesInFolder, validFilesInFolder) {
    var invalidFiles = filesInFolder.filter(function (fileInFolder) {
        if (!validFilesInFolder.includes(fileInFolder)) {
            return true;
        }
        return false;
    });
    return invalidFiles;
};
var getLoggerMessage = function (rule) {
    return "Files in ".concat((0, kleur_1.grey)(rule.folder), " should contains ").concat((0, kleur_1.grey)(rule.patterns.join(',')), ".");
};
var verifyFilenamePatternInFolder = function (projectPath, rule) {
    try {
        if (rule.skip === true) {
            (0, utils_1.showState)(models_1.HandlerRuleStateEnum.skipped, getLoggerMessage(rule));
            return models_1.HandlerRuleStateEnum.skipped;
        }
        var filesInFolder = getFilesInFolder(projectPath, rule.folder, []);
        var validFilesInFolder = getValidFilesInFolder(projectPath, rule);
        var invalidFilesInFolder = getInvalidFilesInFolder(filesInFolder, validFilesInFolder);
        if (invalidFilesInFolder.length != 0) {
            (0, utils_1.showState)(models_1.HandlerRuleStateEnum.failed, getLoggerMessage(rule));
            invalidFilesInFolder.forEach(function (invalidFile) {
                new error_1.FilePatternNotMatchInRuleError(invalidFile, rule.name).showError(1);
            });
            return models_1.HandlerRuleStateEnum.failed;
        }
        else {
            (0, utils_1.showState)(models_1.HandlerRuleStateEnum.passed, getLoggerMessage(rule));
            return models_1.HandlerRuleStateEnum.passed;
        }
    }
    catch (error) {
        error.showError();
        return models_1.HandlerRuleStateEnum.failed;
    }
};
exports.verifyFilenamePatternInFolder = verifyFilenamePatternInFolder;
