"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
var config_model_1 = require("./config.model");
var error_1 = require("../error");
var utils_1 = require("../utils");
var path_1 = require("path");
var ConfigModule = /** @class */ (function () {
    function ConfigModule(rootDir, rulesModule) {
        var _this = this;
        this.rootDir = rootDir;
        this.rulesModule = rulesModule;
        this.getConfigFile = function () {
            var jsonData = utils_1.FileSystem.getJsonFile((0, path_1.join)(_this.rootDir, 'xulin.config.json').replace(/\\/g, '/'));
            _this.validate(jsonData);
            return jsonData;
        };
        this.validate = function (jsonData) {
            var receivedKeys = Object.keys(jsonData);
            var expectedKeys = Object.values(config_model_1.ConfigProps);
            if (receivedKeys.length === 0) {
                throw new error_1.ConfigFileIsEmptyError();
            }
            receivedKeys.forEach(function (receivedKey) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (!expectedKeys.includes(receivedKey)) {
                    throw new error_1.UnexpectFieldInConfigError(receivedKey);
                }
            });
            var config = jsonData;
            _this.rulesModule.validate(config.rules);
        };
    }
    return ConfigModule;
}());
exports.ConfigModule = ConfigModule;
