"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var validations_1 = require("./validations");
exports.ConfigModule = {
    getConfigFile: function (projectPath) {
        try {
            var buffer = fs_1.default.readFileSync(path_1.default.join(projectPath, 'ata.config.json'));
            var jsonData = JSON.parse(buffer.toString());
            validations_1.Validate.configProps(projectPath, jsonData);
            return jsonData;
        }
        catch (error) {
            console.log(error);
            error.showError();
        }
    }
};
