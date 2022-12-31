"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var config_model_1 = require("./config.model");
var error_1 = require("../error");
var ConfigModule = /** @class */ (function () {
    function ConfigModule(rootDir, rulesModule) {
        var _this = this;
        this.rootDir = rootDir;
        this.rulesModule = rulesModule;
        this.getConfigFile = function () {
            var buffer = fs_1.default.readFileSync(path_1.default.join(_this.rootDir, 'nata.config.json'));
            var jsonData = JSON.parse(buffer.toString());
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
