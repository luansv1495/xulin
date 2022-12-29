"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleModule = void 0;
var moment_1 = __importDefault(require("moment"));
var rule_model_1 = require("./models/rule.model");
var models_1 = require("./models");
var verifications_1 = require("./verifications");
var utils_1 = require("../../utils");
var utils_2 = require("./utils");
var execRule = function (projectPath, rule) {
    var state = models_1.HandlerRuleStateEnum.skipped;
    switch (rule.name) {
        case rule_model_1.RuleNameEnum.filenamePatternInFolder:
            state = (0, verifications_1.verifyFilenamePatternInFolder)(projectPath, rule);
            break;
        default:
            break;
    }
    return state;
};
exports.RuleModule = {
    handlerRules: function (projectPath, rules) {
        var _a;
        (0, utils_1.showInfo)(utils_1.InfoMessage.execRules);
        var stats = (_a = {},
            _a[models_1.HandlerRuleStateEnum.skipped] = 0,
            _a[models_1.HandlerRuleStateEnum.passed] = 0,
            _a[models_1.HandlerRuleStateEnum.failed] = 0,
            _a);
        var startTime = new Date();
        console.info('\n');
        rules.forEach(function (rule) {
            var state = execRule(projectPath, rule);
            stats[state] += 1;
        });
        var endTime = new Date();
        var execTime = (0, moment_1.default)(endTime).diff(startTime);
        (0, utils_2.showStats)(stats[models_1.HandlerRuleStateEnum.failed], stats[models_1.HandlerRuleStateEnum.passed], stats[models_1.HandlerRuleStateEnum.skipped], rules.length, execTime);
    }
};
