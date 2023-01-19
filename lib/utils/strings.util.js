"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = exports.InfoMessage = void 0;
var InfoMessage;
(function (InfoMessage) {
    InfoMessage["loadConfig"] = "Loading config...";
    InfoMessage["removeErrorLog"] = "Removing error log file....";
    InfoMessage["execRules"] = "Executing rules...";
})(InfoMessage = exports.InfoMessage || (exports.InfoMessage = {}));
var ErrorMessage;
(function (ErrorMessage) {
    ErrorMessage["configNotFound"] = "ENOENT: no such file or directory, open";
})(ErrorMessage = exports.ErrorMessage || (exports.ErrorMessage = {}));
