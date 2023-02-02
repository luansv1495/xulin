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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRule = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
var utils_1 = require("../utils");
var validation_1 = require("../validation");
var rule_model_1 = require("./rule.model");
var BaseRule = /** @class */ (function () {
    function BaseRule(props) {
        this.verifyMessage = '';
        this.rootDir = '.';
        this.expectedFields = Object.values(rule_model_1.RuleNameEnum);
        this.validations = [
            new validation_1.IsNotObjectValidation(),
            new validation_1.NameIsRequiredValidation(),
            new validation_1.NameIsNotAStringValidation(),
            new validation_1.ContainsExpectedRuleNamesValidation(),
            new validation_1.SkipIsNotABooleanValidation()
        ];
        this.rule = props.rule;
        this.rootDir = props.rootDir;
    }
    BaseRule.prototype.validate = function () {
        var _this = this;
        this.validations.forEach(function (validation) {
            return validation.validate({
                rule: _this.rule,
                rootDir: _this.rootDir,
                expectedFields: _this.expectedFields
            });
        });
    };
    /* istanbul ignore next */
    BaseRule.prototype.customVerify = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                /* istanbul ignore next */
                return [2 /*return*/, {
                        state: rule_model_1.VerifyStateEnum.skipped,
                        passed: 0,
                        failed: 0
                    }];
            });
        });
    };
    /* istanbul ignore next */
    BaseRule.prototype.makeVerifyMessage = function () {
        /* istanbul ignore next */
        return;
    };
    BaseRule.prototype.verify = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.makeVerifyMessage();
                if (this.rule.skip === true) {
                    utils_1.Logger.handler(rule_model_1.VerifyStateEnum.skipped, this.verifyMessage);
                    return [2 /*return*/, {
                            state: rule_model_1.VerifyStateEnum.skipped,
                            passed: 0,
                            failed: 0
                        }];
                }
                return [2 /*return*/, this.customVerify()];
            });
        });
    };
    return BaseRule;
}());
exports.BaseRule = BaseRule;
