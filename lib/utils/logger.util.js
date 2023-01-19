"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var kleur_1 = require("kleur");
var moment_1 = __importDefault(require("moment"));
var fs_1 = __importDefault(require("fs"));
var rule_model_1 = require("../rules/rule.model");
var strings_util_1 = require("./strings.util");
exports.Logger = {
    error: function (errorName, message, nivel) {
        var tabSpace = ' '.repeat((nivel !== null && nivel !== void 0 ? nivel : 0) * 6);
        var title = (0, kleur_1.red)('ERROR: ');
        var errorMessage = tabSpace + title + errorName + ' ' + message + '\n';
        process.stdout.write(errorMessage);
        fs_1.default.writeFileSync('./xulin-error.log', errorMessage);
    },
    excludeErrorLogger: function () {
        var exists = fs_1.default.existsSync('./xulin-error.log');
        if (exists) {
            exports.Logger.info(strings_util_1.InfoMessage.removeErrorLog);
            fs_1.default.rmSync('./xulin-error.log');
        }
    },
    info: function (message) {
        process.stdout.write((0, kleur_1.blue)('INFO: ') + message + '\n');
    },
    handler: function (state, message) {
        if (state === rule_model_1.VerifyStateEnum.failed) {
            process.stdout.write((0, kleur_1.bold)((0, kleur_1.bgRed)(' FAIL ')) + ' ' + message + '\n');
        }
        else if (state === rule_model_1.VerifyStateEnum.passed) {
            process.stdout.write((0, kleur_1.bold)((0, kleur_1.bgGreen)(' PASS ')) + ' ' + message + '\n');
        }
        else {
            process.stdout.write((0, kleur_1.bold)((0, kleur_1.bgYellow)(' SKIP ')) + ' ' + message + '\n');
        }
    },
    stats: function (suite, all, total, execTime) {
        var suiteFailures = (0, kleur_1.bold)((0, kleur_1.red)(suite.failed + ' failed'));
        var suiteSkippeds = (0, kleur_1.bold)((0, kleur_1.yellow)(suite.skipped + ' skipped'));
        var suitePasseds = (0, kleur_1.bold)((0, kleur_1.green)(suite.passed + ' passed'));
        process.stdout.write("\n".concat((0, kleur_1.bold)('Check Suites:'), " ").concat(suiteFailures, ", ").concat(suiteSkippeds, ", ").concat(suitePasseds, ", ").concat(total, " total."));
        var allFailures = (0, kleur_1.bold)((0, kleur_1.red)(all.failed + ' failed'));
        var allPasseds = (0, kleur_1.bold)((0, kleur_1.green)(all.passed + ' passed'));
        process.stdout.write("\n".concat((0, kleur_1.bold)('Checks:'), "       ").concat(allFailures, ", ").concat(allPasseds, ", ").concat(all.failed + all.passed, " total."));
        var execTimeHuman = moment_1.default
            .utc(moment_1.default.duration(execTime).asMilliseconds())
            .format('HH:mm:ss.SSS');
        process.stdout.write("\n".concat((0, kleur_1.bold)('Exec time:'), "    ").concat(execTimeHuman, "\n"));
    }
};
