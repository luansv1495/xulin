"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfigProps = void 0;
var error_1 = require("../../../error");
var validations_1 = require("../../rules/validations");
var models_1 = require("../models");
var validateConfigProps = function (projectPath, jsonData) {
    var receivedKeys = Object.keys(jsonData);
    var expectedKeys = Object.values(models_1.ConfigProps);
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
    (0, validations_1.validateRulesField)(projectPath, config.rules);
};
exports.validateConfigProps = validateConfigProps;
