"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showInfo = exports.showError = void 0;
var kleur_1 = require("kleur");
var showError = function (errorName, message, nivel) {
    if (nivel === void 0) { nivel = 0; }
    console.error(' '.repeat(nivel * 6) + (0, kleur_1.red)('ERROR: ') + errorName + ' ' + message);
};
exports.showError = showError;
var showInfo = function (message) {
    console.info((0, kleur_1.blue)('INFO: ') + message);
};
exports.showInfo = showInfo;
