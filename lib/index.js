"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var config_1 = require("./modules/config");
var error_1 = require("./error");
var rules_1 = require("./modules/rules");
var utils_1 = require("./utils");
(0, utils_1.showInfo)(utils_1.InfoMessage.loadConfig);
var projectPath = process.argv[2];
if (!(0, fs_1.existsSync)(projectPath)) {
    new error_1.ProjectPathNotFoundError(projectPath).showError();
}
else {
    var config = (0, config_1.getConfigFile)(projectPath);
    if (config) {
        (0, rules_1.handlerRules)(projectPath, config.rules);
    }
}
