"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateArray = void 0;
var validateArray = function (item) {
    if (Object.prototype.toString.call(item) != '[object Array]') {
        return "\"".concat(item, "\" is not a array.");
    }
    return null;
};
exports.validateArray = validateArray;
