"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var fs_1 = __importDefault(require("fs"));
var config_1 = require("./modules/config");
var error_1 = require("./error");
var rules_1 = require("./modules/rules");
var utils_1 = require("./utils");
var main = function () {
    (0, utils_1.showInfo)(utils_1.InfoMessage.loadConfig);
    var projectPath = process.argv[2];
    if (!fs_1.default.existsSync(projectPath)) {
        new error_1.ProjectPathNotFoundError(projectPath).showError();
    }
    else {
        var config = config_1.ConfigModule.getConfigFile(projectPath);
        if (config) {
            rules_1.RuleModule.handlerRules(projectPath, config.rules);
        }
    }
};
exports.main = main;
(0, exports.main)();
