"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigFile = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var validations_1 = require("./validations");
var getConfigFile = function (projectPath) {
    try {
        var buffer = (0, fs_1.readFileSync)(path_1.default.join(projectPath, 'ata.config.json'));
        var jsonData = JSON.parse(buffer.toString());
        (0, validations_1.validateConfigProps)(projectPath, jsonData);
        return jsonData;
    }
    catch (error) {
        error.showError();
    }
};
exports.getConfigFile = getConfigFile;
