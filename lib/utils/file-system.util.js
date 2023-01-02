"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystem = void 0;
var fast_glob_1 = __importDefault(require("fast-glob"));
var fs_1 = __importDefault(require("fs"));
var path_1 = require("path");
exports.FileSystem = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getJsonFile: function (path) {
        var buffer = fs_1.default.readFileSync(path);
        var jsonData = JSON.parse(buffer.toString());
        return jsonData;
    },
    exists: function (path) {
        return fs_1.default.existsSync(path);
    },
    getDeepFilesInFolder: function (rootDir, folder, files) {
        var completeFolderPath = (0, path_1.join)(rootDir, folder);
        var items = fs_1.default.readdirSync(completeFolderPath, { withFileTypes: true });
        items.forEach(function (item) {
            if (item.isDirectory()) {
                files = exports.FileSystem.getDeepFilesInFolder(rootDir, (0, path_1.join)(folder, item.name), files);
            }
            else {
                files.push((0, path_1.join)(completeFolderPath, item.name));
            }
        });
        return files;
    },
    getFilesInFolder: function (rootDir, folder) {
        var completeFolderPath = (0, path_1.join)(rootDir, folder);
        var items = fs_1.default.readdirSync(completeFolderPath, { withFileTypes: true });
        var files = items
            .filter(function (item) { return item.isFile(); })
            .map(function (item) { return (0, path_1.join)(completeFolderPath, item.name); });
        return files;
    },
    getFilesByPatternInFolder: function (rootDir, folder, patterns) {
        var validFiles = [];
        patterns.forEach(function (pattern) {
            var files = fast_glob_1.default.sync((0, path_1.join)(rootDir, folder) + '/**/' + pattern);
            validFiles = validFiles.concat(files);
        });
        return validFiles;
    },
    getFoldersInFolder: function (rootDir, folder) {
        var completeFolderPath = (0, path_1.join)(rootDir, folder);
        var items = fs_1.default.readdirSync(completeFolderPath, { withFileTypes: true });
        return items.filter(function (item) { return item.isDirectory(); }).map(function (item) { return item.name; });
    }
};
