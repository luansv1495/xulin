"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.FilenameSizeInFolderRule = void 0;
var kleur_1 = require("kleur");
var error_1 = require("../../error");
var utils_1 = require("../../utils");
var validation_1 = require("../../validation");
var base_rule_1 = require("../base.rule");
var rule_model_1 = require("../rule.model");
var model_1 = require("./model");
var FilenameSizeInFolderRule = /** @class */ (function (_super) {
    __extends(FilenameSizeInFolderRule, _super);
    function FilenameSizeInFolderRule(props) {
        var _this = _super.call(this, props) || this;
        _this.expectedFields = Object.values(model_1.FilenameSizeInFolderProps);
        _this.validations = [
            new validation_1.ContainsUnexpectFieldValidation(),
            new validation_1.ContainsRequiredFieldsValidation(),
            new validation_1.IsValidFolderValidation(),
            new validation_1.IsValidMaxMinValidation()
        ];
        _this.getValidFiles = function (filesInFolder) {
            var validFiles = filesInFolder.filter(function (file) {
                var length = utils_1.FileSystem.getFilename(file).length;
                return length >= _this.rule.min && length <= _this.rule.max;
            });
            return validFiles;
        };
        _this.getInvalidFiles = function (filesInFolder, validFiles) {
            var invalidFiles = filesInFolder.filter(function (file) { return !validFiles.includes(file); });
            return invalidFiles;
        };
        return _this;
    }
    FilenameSizeInFolderRule.prototype.makeVerifyMessage = function () {
        this.verifyMessage = "Filenames must contain a minimum of ".concat((0, kleur_1.grey)(this.rule.min), " characters and a maximum of ").concat((0, kleur_1.grey)(this.rule.max), " characters in ").concat((0, kleur_1.grey)(this.rule.folder), " folder.");
    };
    FilenameSizeInFolderRule.prototype.customVerify = function () {
        return __awaiter(this, void 0, void 0, function () {
            var filesInFolder, validFiles, invalidFiles;
            var _this = this;
            return __generator(this, function (_a) {
                filesInFolder = utils_1.FileSystem.getDeepFilesInFolder(this.rootDir, this.rule.folder, []);
                validFiles = this.getValidFiles(filesInFolder);
                invalidFiles = this.getInvalidFiles(filesInFolder, validFiles);
                if (invalidFiles.length != 0) {
                    utils_1.Logger.handler(rule_model_1.VerifyStateEnum.failed, this.verifyMessage);
                    invalidFiles.forEach(function (invalidFile) {
                        new error_1.FilenameSizeInRuleError(invalidFile, _this.rule.name).showError(1);
                    });
                    return [2 /*return*/, {
                            state: rule_model_1.VerifyStateEnum.failed,
                            passed: validFiles.length,
                            failed: invalidFiles.length
                        }];
                }
                else {
                    utils_1.Logger.handler(rule_model_1.VerifyStateEnum.passed, this.verifyMessage);
                    return [2 /*return*/, {
                            state: rule_model_1.VerifyStateEnum.passed,
                            passed: validFiles.length,
                            failed: invalidFiles.length
                        }];
                }
                return [2 /*return*/];
            });
        });
    };
    return FilenameSizeInFolderRule;
}(base_rule_1.BaseRule));
exports.FilenameSizeInFolderRule = FilenameSizeInFolderRule;
