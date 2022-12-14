"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mock-local-storage");
const chai_1 = __importDefault(require("chai"));
const ethereum_waffle_1 = require("ethereum-waffle");
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
let jsdomCleanup;
before(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    jsdomCleanup = require('jsdom-global')(undefined, { url: 'http://localhost/' });
});
after(() => jsdomCleanup === null || jsdomCleanup === void 0 ? void 0 : jsdomCleanup());
chai_1.default.use(ethereum_waffle_1.solidity);
chai_1.default.use(chai_as_promised_1.default);
//# sourceMappingURL=test-setup.js.map