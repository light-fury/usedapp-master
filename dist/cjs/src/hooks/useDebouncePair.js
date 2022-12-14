"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDebouncePair = void 0;
const react_1 = require("react");
/**
 * Debounce a pair of values of types T and U.
 * It stores a single value but returns after debounced time unless a new value is assigned before the debounce time elapses, in which case the process restarts.

 * This function is used for debouncing multicall until enough calls are aggregated.
 * @param first first variable to be debounced
 * @param second second variable to be debounced
 * @param delay debounce time - amount of time in ms.
 * @internal Intended for internal use - use it on your own risk
 * @returns {} debounced values `[T, U]`
 */
function useDebouncePair(first, second, delay) {
    const [debouncedValue, setDebouncedValue] = (0, react_1.useState)([first, second]);
    (0, react_1.useEffect)(() => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue([first, second]);
        }, delay);
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
            clearTimeout(handler);
        };
    }, [first, second, delay]);
    return debouncedValue;
}
exports.useDebouncePair = useDebouncePair;
//# sourceMappingURL=useDebouncePair.js.map