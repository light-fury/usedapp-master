"use strict";
// NOTE: This file serves as an internal API module. It is exported from the package, but use it on your own risk.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueActiveCalls = exports.getChainMeta = exports.decodeCallResult = exports.encodeCallData = exports.getChainById = exports.warnOnInvalidCall = exports.useBlockNumbers = exports.useInterval = exports.useDebouncePair = exports.useLocalStorage = exports.useDebounce = exports.connectContractToSigner = exports.WindowContext = exports.WindowProvider = exports.useWindow = exports.useReadonlyNetworks = exports.ReadonlyNetworksProvider = exports.useNotificationsContext = exports.useTransactionsContext = exports.useMultiChainStates = exports.DEFAULT_STORED_TRANSACTIONS = exports.DEFAULT_NOTIFICATIONS = exports.chainStateReducer = exports.callsReducer = exports.blockNumberReducer = exports.MultiChainStatesContext = exports.MultiChainStateProvider = exports.ConfigProvider = exports.ConfigContext = void 0;
var providers_1 = require("./providers");
Object.defineProperty(exports, "ConfigContext", { enumerable: true, get: function () { return providers_1.ConfigContext; } });
Object.defineProperty(exports, "ConfigProvider", { enumerable: true, get: function () { return providers_1.ConfigProvider; } });
Object.defineProperty(exports, "MultiChainStateProvider", { enumerable: true, get: function () { return providers_1.MultiChainStateProvider; } });
Object.defineProperty(exports, "MultiChainStatesContext", { enumerable: true, get: function () { return providers_1.MultiChainStatesContext; } });
Object.defineProperty(exports, "blockNumberReducer", { enumerable: true, get: function () { return providers_1.blockNumberReducer; } });
Object.defineProperty(exports, "callsReducer", { enumerable: true, get: function () { return providers_1.callsReducer; } });
Object.defineProperty(exports, "chainStateReducer", { enumerable: true, get: function () { return providers_1.chainStateReducer; } });
Object.defineProperty(exports, "DEFAULT_NOTIFICATIONS", { enumerable: true, get: function () { return providers_1.DEFAULT_NOTIFICATIONS; } });
Object.defineProperty(exports, "DEFAULT_STORED_TRANSACTIONS", { enumerable: true, get: function () { return providers_1.DEFAULT_STORED_TRANSACTIONS; } });
Object.defineProperty(exports, "useMultiChainStates", { enumerable: true, get: function () { return providers_1.useMultiChainStates; } });
Object.defineProperty(exports, "useTransactionsContext", { enumerable: true, get: function () { return providers_1.useTransactionsContext; } });
Object.defineProperty(exports, "useNotificationsContext", { enumerable: true, get: function () { return providers_1.useNotificationsContext; } });
Object.defineProperty(exports, "ReadonlyNetworksProvider", { enumerable: true, get: function () { return providers_1.ReadonlyNetworksProvider; } });
Object.defineProperty(exports, "useReadonlyNetworks", { enumerable: true, get: function () { return providers_1.useReadonlyNetworks; } });
Object.defineProperty(exports, "useWindow", { enumerable: true, get: function () { return providers_1.useWindow; } });
Object.defineProperty(exports, "WindowProvider", { enumerable: true, get: function () { return providers_1.WindowProvider; } });
Object.defineProperty(exports, "WindowContext", { enumerable: true, get: function () { return providers_1.WindowContext; } });
var hooks_1 = require("./hooks");
Object.defineProperty(exports, "connectContractToSigner", { enumerable: true, get: function () { return hooks_1.connectContractToSigner; } });
Object.defineProperty(exports, "useDebounce", { enumerable: true, get: function () { return hooks_1.useDebounce; } });
Object.defineProperty(exports, "useLocalStorage", { enumerable: true, get: function () { return hooks_1.useLocalStorage; } });
Object.defineProperty(exports, "useDebouncePair", { enumerable: true, get: function () { return hooks_1.useDebouncePair; } });
Object.defineProperty(exports, "useInterval", { enumerable: true, get: function () { return hooks_1.useInterval; } });
Object.defineProperty(exports, "useBlockNumbers", { enumerable: true, get: function () { return hooks_1.useBlockNumbers; } });
var helpers_1 = require("./helpers");
Object.defineProperty(exports, "warnOnInvalidCall", { enumerable: true, get: function () { return helpers_1.warnOnInvalidCall; } });
Object.defineProperty(exports, "getChainById", { enumerable: true, get: function () { return helpers_1.getChainById; } });
Object.defineProperty(exports, "encodeCallData", { enumerable: true, get: function () { return helpers_1.encodeCallData; } });
Object.defineProperty(exports, "decodeCallResult", { enumerable: true, get: function () { return helpers_1.decodeCallResult; } });
Object.defineProperty(exports, "getChainMeta", { enumerable: true, get: function () { return helpers_1.getChainMeta; } });
Object.defineProperty(exports, "getUniqueActiveCalls", { enumerable: true, get: function () { return helpers_1.getUniqueActiveCalls; } });
//# sourceMappingURL=internal.js.map