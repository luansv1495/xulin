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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleFactory = void 0;
var base_rule_1 = require("./base.rule");
var filename_pattern_in_folder_1 = require("./filename-pattern-in-folder");
var filename_size_in_folder_1 = require("./filename-size-in-folder");
var folder_name_in_folder_1 = require("./folder-name-in-folder");
var folder_name_size_in_folder_1 = require("./folder-name-size-in-folder");
var max_files_in_folder_1 = require("./max-files-in-folder");
var max_folders_in_folder_1 = require("./max-folders-in-folder");
var no_dependencies_1 = require("./no-dependencies");
var rule_model_1 = require("./rule.model");
var RuleFactory = /** @class */ (function () {
    function RuleFactory(rule, rootDir) {
        var _this = this;
        this.rule = rule;
        this.rootDir = rootDir;
        this.validate = function () {
            new base_rule_1.BaseRule(_this.props).validate();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            var _a = _this.rule, skip = _a.skip, rest = __rest(_a, ["skip"]);
            var props = { rule: rest, rootDir: _this.rootDir };
            if (_this.rule.name === rule_model_1.RuleNameEnum.filenamePatternInFolder) {
                new filename_pattern_in_folder_1.FilenamePatternInFolderRule(props).validate();
            }
            else if (_this.rule.name === rule_model_1.RuleNameEnum.folderNameInFolder) {
                new folder_name_in_folder_1.FolderNameInFolderRule(props).validate();
            }
            else if (_this.rule.name === rule_model_1.RuleNameEnum.maxFilesInFolder) {
                new max_files_in_folder_1.MaxFilesInFolderRule(props).validate();
            }
            else if (_this.rule.name === rule_model_1.RuleNameEnum.maxFoldersInFolder) {
                new max_folders_in_folder_1.MaxFoldersInFolderRule(props).validate();
            }
            else if (_this.rule.name === rule_model_1.RuleNameEnum.filenameSizeInFolder) {
                new filename_size_in_folder_1.FilenameSizeInFolderRule(props).validate();
            }
            else if (_this.rule.name === rule_model_1.RuleNameEnum.folderNameSizeInFolder) {
                new folder_name_size_in_folder_1.FolderNameSizeInFolderRule(props).validate();
            }
            else if (_this.rule.name === rule_model_1.RuleNameEnum.noDependencies) {
                new no_dependencies_1.NoDependenciesRule(props).validate();
            }
        };
        this.verify = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.rule.name;
                        switch (_a) {
                            case rule_model_1.RuleNameEnum.filenamePatternInFolder: return [3 /*break*/, 1];
                            case rule_model_1.RuleNameEnum.folderNameInFolder: return [3 /*break*/, 3];
                            case rule_model_1.RuleNameEnum.maxFilesInFolder: return [3 /*break*/, 5];
                            case rule_model_1.RuleNameEnum.maxFoldersInFolder: return [3 /*break*/, 7];
                            case rule_model_1.RuleNameEnum.filenameSizeInFolder: return [3 /*break*/, 9];
                            case rule_model_1.RuleNameEnum.folderNameSizeInFolder: return [3 /*break*/, 11];
                            case rule_model_1.RuleNameEnum.noDependencies: return [3 /*break*/, 13];
                        }
                        return [3 /*break*/, 15];
                    case 1: return [4 /*yield*/, new filename_pattern_in_folder_1.FilenamePatternInFolderRule(this.props).verify()];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, new folder_name_in_folder_1.FolderNameInFolderRule(this.props).verify()];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: return [4 /*yield*/, new max_files_in_folder_1.MaxFilesInFolderRule(this.props).verify()];
                    case 6: return [2 /*return*/, _b.sent()];
                    case 7: return [4 /*yield*/, new max_folders_in_folder_1.MaxFoldersInFolderRule(this.props).verify()];
                    case 8: return [2 /*return*/, _b.sent()];
                    case 9: return [4 /*yield*/, new filename_size_in_folder_1.FilenameSizeInFolderRule(this.props).verify()];
                    case 10: return [2 /*return*/, _b.sent()];
                    case 11: return [4 /*yield*/, new folder_name_size_in_folder_1.FolderNameSizeInFolderRule(this.props).verify()];
                    case 12: return [2 /*return*/, _b.sent()];
                    case 13: return [4 /*yield*/, new no_dependencies_1.NoDependenciesRule(this.props).verify()];
                    case 14: return [2 /*return*/, _b.sent()];
                    case 15: return [2 /*return*/];
                }
            });
        }); };
        this.props = {
            rule: this.rule,
            rootDir: this.rootDir
        };
    }
    return RuleFactory;
}());
exports.RuleFactory = RuleFactory;
