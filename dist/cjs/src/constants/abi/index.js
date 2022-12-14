"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockNumberContract = exports.ERC20MockInterface = exports.ERC20Mock = exports.ERC20Interface = exports.ERC20 = exports.MultiCall2ABI = exports.MultiCall2 = exports.MultiCallABI = exports.MultiCall = void 0;
const ethers_1 = require("ethers");
const MultiCall_json_1 = __importDefault(require("./MultiCall.json"));
exports.MultiCall = MultiCall_json_1.default;
const MultiCall2_json_1 = __importDefault(require("./MultiCall2.json"));
exports.MultiCall2 = MultiCall2_json_1.default;
const ERC20_json_1 = __importDefault(require("./ERC20.json"));
exports.ERC20 = ERC20_json_1.default;
const ERC20Mock_json_1 = __importDefault(require("./ERC20Mock.json"));
exports.ERC20Mock = ERC20Mock_json_1.default;
const BlockNumber_json_1 = __importDefault(require("./BlockNumber.json"));
exports.BlockNumberContract = BlockNumber_json_1.default;
const Interface = ethers_1.utils.Interface;
const MultiCallABI = new Interface(MultiCall_json_1.default.abi);
exports.MultiCallABI = MultiCallABI;
const MultiCall2ABI = new Interface(MultiCall2_json_1.default.abi);
exports.MultiCall2ABI = MultiCall2ABI;
const ERC20Interface = new Interface(ERC20_json_1.default.abi);
exports.ERC20Interface = ERC20Interface;
const ERC20MockInterface = new Interface(ERC20Mock_json_1.default.abi);
exports.ERC20MockInterface = ERC20MockInterface;
__exportStar(require("./doubler"), exports);
__exportStar(require("./timestamp"), exports);
__exportStar(require("./reverter"), exports);
//# sourceMappingURL=index.js.map