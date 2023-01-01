"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystem = void 0;
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var fast_glob_1 = __importDefault(require("fast-glob"));
exports.FileSystem = {
    getFilesInFolder: function (rootDir, folder, files) {
        var completeFolderPath = path_1.default.join(rootDir, folder);
        var items = (0, fs_1.readdirSync)(completeFolderPath, { withFileTypes: true });
        items.forEach(function (item) {
            if (item.isDirectory()) {
                files = exports.FileSystem.getFilesInFolder(rootDir, path_1.default.join(folder, item.name), files);
            }
            else {
                files.push(path_1.default.join(completeFolderPath, item.name));
            }
        });
        return files;
    },
    getFilesByPatternInFolder: function (rootDir, folder, patterns) {
        var validFiles = [];
        patterns.forEach(function (pattern) {
            var files = fast_glob_1.default.sync(path_1.default.join(rootDir, folder) + '/**/' + pattern);
            validFiles = validFiles.concat(files);
        });
        return validFiles;
    },
    getFoldersInFolder: function (rootDir, folder) {
        var completeFolderPath = path_1.default.join(rootDir, folder);
        var items = (0, fs_1.readdirSync)(completeFolderPath, { withFileTypes: true });
        return items.filter(function (item) { return item.isDirectory(); }).map(function (item) { return item.name; });
    }
};
