"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFolder = void 0;
var path_1 = __importDefault(require("path"));
var utils_1 = require("../../utils");
var validateFolder = function (rootDir, folder) {
    if (typeof folder != 'string') {
        return "\"".concat(folder, "\" is not a string.");
    }
    else if (!folder) {
        return "\"".concat(folder, "\" is invalid.");
    }
    else if (folder.split('.').length != 1) {
        return "\"".concat(folder, "\" is not a folder.");
    }
    else if (!utils_1.FileSystem.exists(path_1.default.join(rootDir, folder))) {
        return "\"".concat(folder, "\" not found.");
    }
    return null;
};
exports.validateFolder = validateFolder;
