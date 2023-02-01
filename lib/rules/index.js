"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        this.verify = function () { return __awaiter(_this, void 0, void 0, function () {
            var startTime, ruleVerifies;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        utils_1.Logger.info(utils_1.InfoMessage.execRules);
                        startTime = new Date();
                        process.stdout.write('\n');
                        ruleVerifies = this.rules.map(function (rule) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, new rule_factory_1.RuleFactory(rule, this.rootDir).verify()];
                                    case 1:
                                        result = _a.sent();
                                        this.stats.suite[result.state] += 1;
                                        this.stats.all[rule_model_1.VerifyStateEnum.failed] += result.failed;
                                        this.stats.all[rule_model_1.VerifyStateEnum.passed] += result.passed;
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(ruleVerifies).then(function () {
                                _this.showStats(startTime);
                                if (_this.stats.suite.failed >= 1) {
                                    utils_1.ProcessUtil.exit();
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
    }
    return RulesModule;
}());
exports.RulesModule = RulesModule;
