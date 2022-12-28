"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showStats = exports.showState = void 0;
var kleur_1 = require("kleur");
var moment_1 = __importDefault(require("moment"));
var models_1 = require("../models");
var showState = function (state, message) {
    if (state === models_1.HandlerRuleStateEnum.failed) {
        console.info((0, kleur_1.bgRed)(' FAIL ') + ' ' + message);
    }
    else if (state === models_1.HandlerRuleStateEnum.passed) {
        console.info((0, kleur_1.bgGreen)(' PASS ') + ' ' + message);
    }
    else {
        console.info((0, kleur_1.bgYellow)(' SKIP ') + ' ' + message);
    }
};
exports.showState = showState;
var showStats = function (failure, passed, skipped, total, execTime) {
    console.info("\nStats: ".concat((0, kleur_1.red)(failure + ' failed'), ", ").concat((0, kleur_1.yellow)(skipped + ' skipped'), ", ").concat((0, kleur_1.green)(passed + ' passed'), ", ").concat(total, " total."));
    console.info("Exec time: ".concat(moment_1.default
        .utc(moment_1.default.duration(execTime).asMilliseconds())
        .format('HH:mm:ss.SSS'), "\n"));
};
exports.showStats = showStats;
