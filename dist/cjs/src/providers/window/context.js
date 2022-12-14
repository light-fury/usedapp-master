"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindow = exports.WindowContext = void 0;
const react_1 = require("react");
/**
 * @internal Intended for internal use - use it on your own risk
 */
exports.WindowContext = (0, react_1.createContext)(true);
/**
 * @internal
 */
function useWindow() {
    return (0, react_1.useContext)(exports.WindowContext);
}
exports.useWindow = useWindow;
//# sourceMappingURL=context.js.map