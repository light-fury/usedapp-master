"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortenString = void 0;
function shortenString(str) {
    return str.substring(0, 6) + '...' + str.substring(str.length - 4);
}
exports.shortenString = shortenString;
//# sourceMappingURL=common.js.map