"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RulesModule = void 0;
var moment_1 = __importDefault(require("moment"));
var error_1 = require("../error");
var utils_1 = require("../utils");
var rule_factory_1 = require("./rule.factory");
var rule_model_1 = require("./rule.model");
var RulesModule = /** @class */ (function () {
    function RulesModule(rootDir) {
        var _a, _b;
        var _this = this;
        this.rootDir = rootDir;
        this.rules = [];
        this.stats = {
            suite: (_a = {},
                _a[rule_model_1.VerifyStateEnum.skipped] = 0,
                _a[rule_model_1.VerifyStateEnum.passed] = 0,
                _a[rule_model_1.VerifyStateEnum.failed] = 0,
                _a),
            all: (_b = {},
                _b[rule_model_1.VerifyStateEnum.passed] = 0,
                _b[rule_model_1.VerifyStateEnum.failed] = 0,
                _b)
        };
        this.validate = function (rules) {
            if (Object.prototype.toString.call(rules) != '[object Array]') {
                throw new error_1.RuleIsNotArrayError();
            }
            rules.forEach(function (item) {
                new rule_factory_1.RuleFactory(item, _this.rootDir).validate();
            });
            _this.rules = rules;
        };
        this.showStats = function (startTime) {
            var endTime = new Date();
            var execTime = (0, moment_1.default)(endTime).diff(startTime);
            utils_1.Logger.stats(_this.stats.suite, _this.stats.all, _this.rules.length, execTime);
        };
        this.verify = function () {
            utils_1.Logger.info(utils_1.InfoMessage.execRules);
            var startTime = new Date();
            process.stdout.write('\n');
            _this.rules.forEach(function (rule) {
                var result = new rule_factory_1.RuleFactory(rule, _this.rootDir).verify();
                _this.stats.suite[result.state] += 1;
                _this.stats.all[rule_model_1.VerifyStateEnum.failed] += result.failed;
                _this.stats.all[rule_model_1.VerifyStateEnum.passed] += result.passed;
            });
            _this.showStats(startTime);
            if (_this.stats.suite.failed >= 1) {
                utils_1.ProcessUtil.exit();
            }
        };
    }
    return RulesModule;
}());
exports.RulesModule = RulesModule;
