"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Andromeda = exports.Stardust = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const stardustExplorerUrl = 'https://stardust-explorer.metis.io';
exports.Stardust = {
    chainId: 588,
    chainName: 'Stardust',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xaF9D4DC0698d8FD9f41387ecb08D9976079B8086',
    // RPC URL source: https://chainlist.org/
    rpcUrl: 'https://stardust.metis.io/?owner=588',
    nativeCurrency: {
        name: 'METIS',
        symbol: 'METIS',
        decimals: 18,
    },
    blockExplorerUrl: stardustExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(stardustExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(stardustExplorerUrl),
};
const andromedaExplorerUrl = 'https://andromeda-explorer.metis.io';
exports.Andromeda = {
    chainId: 1088,
    chainName: 'Andromeda',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x1a2AFb22B8A90A77a93e80ceA61f89D04e05b796',
    // RPC URL source: https://chainlist.org/
    rpcUrl: 'https://andromeda.metis.io/?owner=1088',
    nativeCurrency: {
        name: 'METIS',
        symbol: 'METIS',
        decimals: 18,
    },
    blockExplorerUrl: andromedaExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(andromedaExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(andromedaExplorerUrl),
};
exports.default = { Stardust: exports.Stardust, Andromeda: exports.Andromeda };
//# sourceMappingURL=metis.js.map