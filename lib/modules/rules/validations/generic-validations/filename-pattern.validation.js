"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFilenamePattern = void 0;
var validateFilenamePattern = function (filename) {
    if (typeof filename != 'string') {
        return "\"".concat(filename, "\" is not a string.");
    }
    else if (!filename) {
        return "\"".concat(filename, "\" is invalid.");
    }
    else if (filename.split('.').length <= 1) {
        return "\"".concat(filename, "\" is not a file.");
    }
    return null;
};
exports.validateFilenamePattern = validateFilenamePattern;
