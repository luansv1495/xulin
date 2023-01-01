"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFoldername = void 0;
var validateFoldername = function (folderName) {
    if (typeof folderName != 'string') {
        return "\"".concat(folderName, "\" is not a string.");
    }
    else if (!folderName) {
        return "\"".concat(folderName, "\" is invalid.");
    }
    else if (folderName.split('.').length != 1) {
        return "\"".concat(folderName, "\" is not a folder.");
    }
    return null;
};
exports.validateFoldername = validateFoldername;
