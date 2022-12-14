"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChainCall = exports.useChainCalls = void 0;
const useRawCalls_1 = require("./useRawCalls");
/**
 * Makes multiple calls to specific contracts and returns corresponding values. The hook will cause the component to refresh when values change.
 * Calls will be combined into a single multicall across all uses of {@link useChainCall}, {@link useChainCalls}, {@link useRawCall} and {@link useRawCalls}.
 * @public
 * @deprecated It's recommended to use {@link useCalls} or {@link useRawCalls} instead.
 * @param calls list of calls, also see {@link RawCall}. Calls need to be in the same order across component renders.
 * @returns encoded result or Falsy value if call didn't return yet or an error occurred.
 */
function useChainCalls(calls) {
    const results = (0, useRawCalls_1.useRawCalls)(calls);
    return results.map((result) => result === null || result === void 0 ? void 0 : result.value);
}
exports.useChainCalls = useChainCalls;
/**
 * Makes a call to a specific contract and returns its value. The hook will cause the component to refresh whenever a new block is mined and the value is changed.
 * Calls will be combined into a single multicall across all uses of {@link useChainCall}, {@link useChainCalls}, {@link useRawCall} and {@link useRawCalls}.
 * @public
 * @deprecated It's recommended to use {@link useCall} or {@link useRawCall} instead.
 * @param call a single call, also see {@link RawCall}. A call can be `Falsy`, as it is important to keep the same ordering of hooks even if in a given render cycle there might be not enough information to perform a call.
 * @returns encoded result or Falsy value if call didn't return yet or an error occurred.
 */
function useChainCall(call) {
    return useChainCalls([call])[0];
}
exports.useChainCall = useChainCall;
//# sourceMappingURL=useChainCalls.js.map