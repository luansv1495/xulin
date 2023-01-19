"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var error_1 = require("./error");
var utils_1 = require("./utils");
var rules_1 = require("./rules");
var config_1 = require("./config");
var main = function () {
    try {
        utils_1.Logger.info(utils_1.InfoMessage.loadConfig);
        var rootDir = process.argv[2];
        if (!utils_1.FileSystem.exists(rootDir)) {
            throw new error_1.ProjectPathNotFoundError(rootDir);
        }
        else {
            var rulesModule = new rules_1.RulesModule(rootDir);
            var configModule = new config_1.ConfigModule(rootDir, rulesModule);
            var config = configModule.getConfigFile();
            if (config) {
                //Logger.excludeErrorLogger();
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
        utils_1.ProcessUtil.exit();
    }
};
exports.main = main;
(0, exports.main)();
