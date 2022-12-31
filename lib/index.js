"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var fs_1 = __importDefault(require("fs"));
var error_1 = require("./error");
var utils_1 = require("./utils");
var rules_1 = require("./rules");
var config_1 = require("./config");
var main = function () {
    try {
        utils_1.Logger.info(utils_1.InfoMessage.loadConfig);
        var rootDir = process.argv[2];
        if (!fs_1.default.existsSync(rootDir)) {
            new error_1.ProjectPathNotFoundError(rootDir).showError();
        }
        else {
            var rulesModule = new rules_1.RulesModule(rootDir);
            var configModule = new config_1.ConfigModule(rootDir, rulesModule);
            var config = configModule.getConfigFile();
            if (config) {
                rulesModule.verify();
            }
        }
    }
    catch (error) {
        if (error.name === 'SyntaxError') {
            utils_1.Logger.error('UnexpectedError', error.message);
        }
        else if (error.message.startsWith(utils_1.ErrorMessage.configNotFound)) {
            utils_1.Logger.error('ConfigError', error.message);
        }
        else {
            error.showError();
        }
    }
};
exports.main = main;
(0, exports.main)();
