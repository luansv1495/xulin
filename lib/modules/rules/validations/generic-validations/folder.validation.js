"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFolder = void 0;
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var validateFolder = function (projectPath, folder) {
    if (typeof folder != 'string') {
        return "\"".concat(folder, "\" is not a string.");
    }
    else if (!folder) {
        return "\"".concat(folder, "\" is invalid.");
    }
    else if (folder.split('.').length != 1) {
        return "\"".concat(folder, "\" is not a folder.");
    }
    else if (!(0, fs_1.existsSync)(path_1.default.join(projectPath, folder))) {
        return "Folder \"".concat(folder, "\" not found.");
    }
    return null;
};
exports.validateFolder = validateFolder;
