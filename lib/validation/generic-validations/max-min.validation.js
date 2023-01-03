"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMaxMin = void 0;
var validateMaxMin = function (max, min) {
    if (min >= max) {
        return "\"".concat(min, "\" is greater than or equal to the max value.");
    }
    return null;
};
exports.validateMaxMin = validateMaxMin;
