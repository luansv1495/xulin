"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuantity = void 0;
var validateQuantity = function (quantity) {
    if (typeof quantity != 'number') {
        return "\"".concat(quantity, "\" is not a number.");
    }
    else if (quantity < 0) {
        return "\"".concat(quantity, "\" must be greater than or equal to 0.");
    }
    return null;
};
exports.validateQuantity = validateQuantity;
