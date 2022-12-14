"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEtherBalance = void 0;
const constants_1 = require("../constants");
const useMulticallAddress_1 = require("./useMulticallAddress");
const useCall_1 = require("./useCall");
const ethers_1 = require("ethers");
/**
 * Returns ether balance of a given account.
 * @param address address of an account
 * @returns a balance of the account which is BigNumber or `undefined` if not connected to network or address is a falsy value
 * @public
 *
 * @example
 * const { account } = useEthers()
 * const etherBalance = useEtherBalance(account)
 *
 * return (
 *   {etherBalance && <p>Ether balance: {formatEther(etherBalance)} ETH </p>}
 * )
 */
function useEtherBalance(address, queryParams = {}) {
    var _a;
    const multicallAddress = (0, useMulticallAddress_1.useMulticallAddress)(queryParams);
    const { value: value } = (_a = (0, useCall_1.useCall)(multicallAddress &&
        address && {
        contract: new ethers_1.Contract(multicallAddress, constants_1.MultiCallABI),
        method: 'getEthBalance',
        args: [address],
    }, queryParams)) !== null && _a !== void 0 ? _a : {};
    return value === null || value === void 0 ? void 0 : value[0];
}
exports.useEtherBalance = useEtherBalance;
//# sourceMappingURL=useEtherBalance.js.map