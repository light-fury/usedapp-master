"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const chai_1 = require("chai");
const ethers_1 = require("ethers");
const testing_1 = require("../../src/testing");
const utils_1 = require("ethers/lib/utils");
const BASE_TX_COST = 21000;
describe('useSendTransaction', () => {
    let network1;
    let config;
    let wallet1;
    let wallet2;
    let spender;
    let receiver;
    let secondReceiver;
    beforeEach(async () => {
        ;
        ({ config, network1 } = await (0, testing_1.setupTestingConfig)());
        wallet2 = network1.wallets[0];
        wallet1 = ethers_1.ethers.Wallet.fromMnemonic('radar blur cabbage chef fix engine embark joy scheme fiction master release').connect(network1.provider);
        // Top up the wallet because it has 0 funds initially - on both providers.
        await network1.wallets[0].sendTransaction({ to: wallet1.address, value: (0, utils_1.parseEther)('1') });
        spender = network1.deployer;
        receiver = network1.wallets[0];
        secondReceiver = network1.wallets[1];
    });
    it('success', async () => {
        const { result, waitForCurrent, waitForNextUpdate } = await (0, testing_1.renderDAppHook)(src_1.useSendTransaction, { config });
        await waitForNextUpdate();
        const receipt = await result.current.sendTransaction({ to: wallet1.address, value: ethers_1.BigNumber.from(10) });
        await waitForCurrent((val) => val.state !== undefined);
        (0, chai_1.expect)(result.current.state.status).to.eq('Success');
        await (0, chai_1.expect)(await network1.provider.getTransaction(receipt.transactionHash)).to.changeEtherBalances([network1.deployer, wallet1], ['-10', '10']);
    });
    it('sends with different signer', async () => {
        const receiverBalance = await receiver.getBalance();
        const secondReceiverBalance = await secondReceiver.getBalance();
        const { result, waitForCurrent, waitForNextUpdate } = await (0, testing_1.renderDAppHook)(() => (0, src_1.useSendTransaction)({ signer: receiver }), {
            config,
        });
        await waitForNextUpdate();
        await result.current.sendTransaction({ to: secondReceiver.address, value: ethers_1.BigNumber.from(10) });
        await waitForCurrent((val) => val.state != undefined);
        (0, chai_1.expect)(result.current.state.status).to.eq('Success');
        (0, chai_1.expect)(await secondReceiver.getBalance()).to.eq(secondReceiverBalance.add(10));
        (0, chai_1.expect)(await receiver.getBalance()).to.not.eq(receiverBalance);
    });
    it('Exception(invalid sender)', async () => {
        const { result, waitForCurrent, waitForNextUpdate } = await (0, testing_1.renderDAppHook)(src_1.useSendTransaction, { config });
        await waitForNextUpdate();
        await result.current.sendTransaction({ to: '0x1', value: ethers_1.utils.parseEther('1') });
        await waitForCurrent((val) => val.state !== undefined);
        (0, chai_1.expect)(result.current.state.status).to.eq('Exception');
        (0, chai_1.expect)(result.current.state.errorMessage).to.eq('invalid address');
    });
    it('transfer ether with limit', async () => {
        var _a;
        const { result, waitForCurrent, waitForNextUpdate } = await (0, testing_1.renderDAppHook)(() => (0, src_1.useSendTransaction)({ signer: wallet1 }), {
            config: {
                ...config,
                gasLimitBufferPercentage: 100,
            },
        });
        await waitForNextUpdate();
        await result.current.sendTransaction({ to: wallet2.address, value: ethers_1.BigNumber.from(10) });
        await waitForCurrent((val) => val.state !== undefined);
        (0, chai_1.expect)(result.current.state.status).to.eq('Success');
        (0, chai_1.expect)((_a = result.current.state.transaction) === null || _a === void 0 ? void 0 : _a.gasLimit.toNumber()).to.equal(2 * BASE_TX_COST);
    });
    it('transfer ether with limit in args', async () => {
        var _a;
        const { result, waitForCurrent, waitForNextUpdate } = await (0, testing_1.renderDAppHook)(() => (0, src_1.useSendTransaction)({
            signer: wallet1,
            gasLimitBufferPercentage: 100,
        }), {
            config,
        });
        await waitForNextUpdate();
        await result.current.sendTransaction({ to: wallet2.address, value: ethers_1.BigNumber.from(10) });
        await waitForCurrent((val) => val.state !== undefined);
        (0, chai_1.expect)(result.current.state.status).to.eq('Success');
        (0, chai_1.expect)(result.current.state.status).to.eq('Success');
        (0, chai_1.expect)((_a = result.current.state.transaction) === null || _a === void 0 ? void 0 : _a.gasLimit.toNumber()).to.equal(2 * BASE_TX_COST);
    });
    it('Returns receipt after correct transaction', async () => {
        var _a, _b, _c, _d, _e, _f, _g;
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(src_1.useSendTransaction, { config });
        const receiverBalance = await receiver.getBalance();
        await result.current.sendTransaction({ to: receiver.address, value: ethers_1.BigNumber.from(10) });
        await waitForCurrent((val) => val.state !== undefined);
        (0, chai_1.expect)(result.current.state.status).to.eq('Success');
        (0, chai_1.expect)(await receiver.getBalance()).to.eq(receiverBalance.add(10));
        (0, chai_1.expect)(result.current.state.receipt).to.not.be.undefined;
        (0, chai_1.expect)((_a = result.current.state.receipt) === null || _a === void 0 ? void 0 : _a.to).to.eq(receiver.address);
        (0, chai_1.expect)((_b = result.current.state.receipt) === null || _b === void 0 ? void 0 : _b.from).to.eq(spender.address);
        (0, chai_1.expect)((_c = result.current.state.receipt) === null || _c === void 0 ? void 0 : _c.gasUsed).to.be.gt(0);
        (0, chai_1.expect)((_d = result.current.state.receipt) === null || _d === void 0 ? void 0 : _d.status).to.eq(1);
        (0, chai_1.expect)((_e = result.current.state.receipt) === null || _e === void 0 ? void 0 : _e.blockHash).to.match(/^0x/);
        (0, chai_1.expect)((_f = result.current.state.receipt) === null || _f === void 0 ? void 0 : _f.transactionHash).to.match(/^0x/);
        (0, chai_1.expect)((_g = result.current.state.receipt) === null || _g === void 0 ? void 0 : _g.gasUsed).to.be.gt(0);
    });
    it('Can send transaction with private key', async () => {
        var _a, _b, _c, _d, _e, _f, _g;
        const { result, waitForCurrent, waitForNextUpdate } = await (0, testing_1.renderDAppHook)(() => (0, src_1.useSendTransaction)({ chainId: 1, privateKey: wallet1.privateKey }), { config });
        await waitForNextUpdate();
        const receipt = await result.current.sendTransaction({ to: wallet2.address, value: ethers_1.BigNumber.from(10) });
        await waitForCurrent((val) => val.state !== undefined);
        (0, chai_1.expect)(result.current.state.status).to.eq('Success');
        const tx = await network1.provider.getTransaction(receipt.transactionHash);
        await (0, chai_1.expect)(tx).to.changeEtherBalances([wallet1, wallet2], ['-10', '10']);
        (0, chai_1.expect)(result.current.state.receipt).to.not.be.undefined;
        (0, chai_1.expect)((_a = result.current.state.receipt) === null || _a === void 0 ? void 0 : _a.to).to.eq(wallet2.address);
        (0, chai_1.expect)((_b = result.current.state.receipt) === null || _b === void 0 ? void 0 : _b.from).to.eq(wallet1.address);
        (0, chai_1.expect)((_c = result.current.state.receipt) === null || _c === void 0 ? void 0 : _c.gasUsed).to.be.gt(0);
        (0, chai_1.expect)((_d = result.current.state.receipt) === null || _d === void 0 ? void 0 : _d.status).to.eq(1);
        (0, chai_1.expect)((_e = result.current.state.receipt) === null || _e === void 0 ? void 0 : _e.blockHash).to.match(/^0x/);
        (0, chai_1.expect)((_f = result.current.state.receipt) === null || _f === void 0 ? void 0 : _f.transactionHash).to.match(/^0x/);
        (0, chai_1.expect)((_g = result.current.state.receipt) === null || _g === void 0 ? void 0 : _g.gasUsed).to.be.gt(0);
    });
    it('Can send transaction with mnemonic phrase', async () => {
        var _a, _b, _c, _d, _e, _f, _g;
        const { result, waitForCurrent, waitForNextUpdate } = await (0, testing_1.renderDAppHook)(() => (0, src_1.useSendTransaction)({ chainId: 1, mnemonicPhrase: wallet1.mnemonic.phrase }), { config });
        await waitForNextUpdate();
        const receipt = await result.current.sendTransaction({ to: wallet2.address, value: ethers_1.BigNumber.from(10) });
        await waitForCurrent((val) => val.state !== undefined);
        (0, chai_1.expect)(result.current.state.status).to.eq('Success');
        const tx = await network1.provider.getTransaction(receipt.transactionHash);
        await (0, chai_1.expect)(tx).to.changeEtherBalances([wallet1, wallet2], ['-10', '10']);
        (0, chai_1.expect)(result.current.state.receipt).to.not.be.undefined;
        (0, chai_1.expect)((_a = result.current.state.receipt) === null || _a === void 0 ? void 0 : _a.to).to.eq(wallet2.address);
        (0, chai_1.expect)((_b = result.current.state.receipt) === null || _b === void 0 ? void 0 : _b.from).to.eq(wallet1.address);
        (0, chai_1.expect)((_c = result.current.state.receipt) === null || _c === void 0 ? void 0 : _c.gasUsed).to.be.gt(0);
        (0, chai_1.expect)((_d = result.current.state.receipt) === null || _d === void 0 ? void 0 : _d.status).to.eq(1);
        (0, chai_1.expect)((_e = result.current.state.receipt) === null || _e === void 0 ? void 0 : _e.blockHash).to.match(/^0x/);
        (0, chai_1.expect)((_f = result.current.state.receipt) === null || _f === void 0 ? void 0 : _f.transactionHash).to.match(/^0x/);
        (0, chai_1.expect)((_g = result.current.state.receipt) === null || _g === void 0 ? void 0 : _g.gasUsed).to.be.gt(0);
    });
    it('Can send transaction with encrypted json', async () => {
        var _a, _b, _c, _d, _e, _f, _g;
        const json = await wallet1.encrypt('test');
        const { result, waitForCurrent, waitForNextUpdate } = await (0, testing_1.renderDAppHook)(() => (0, src_1.useSendTransaction)({
            chainId: 1,
            password: 'test',
            json,
        }), { config });
        await waitForNextUpdate();
        const receipt = await result.current.sendTransaction({ to: wallet2.address, value: ethers_1.BigNumber.from(10) });
        await waitForCurrent((val) => val.state !== undefined);
        (0, chai_1.expect)(result.current.state.status).to.eq('Success');
        const tx = await network1.provider.getTransaction(receipt.transactionHash);
        await (0, chai_1.expect)(tx).to.changeEtherBalances([wallet1, wallet2], ['-10', '10']);
        (0, chai_1.expect)(result.current.state.receipt).to.not.be.undefined;
        (0, chai_1.expect)((_a = result.current.state.receipt) === null || _a === void 0 ? void 0 : _a.to).to.eq(wallet2.address);
        (0, chai_1.expect)((_b = result.current.state.receipt) === null || _b === void 0 ? void 0 : _b.from).to.eq(wallet1.address);
        (0, chai_1.expect)((_c = result.current.state.receipt) === null || _c === void 0 ? void 0 : _c.gasUsed).to.be.gt(0);
        (0, chai_1.expect)((_d = result.current.state.receipt) === null || _d === void 0 ? void 0 : _d.status).to.eq(1);
        (0, chai_1.expect)((_e = result.current.state.receipt) === null || _e === void 0 ? void 0 : _e.blockHash).to.match(/^0x/);
        (0, chai_1.expect)((_f = result.current.state.receipt) === null || _f === void 0 ? void 0 : _f.transactionHash).to.match(/^0x/);
        (0, chai_1.expect)((_g = result.current.state.receipt) === null || _g === void 0 ? void 0 : _g.gasUsed).to.be.gt(0);
    }).timeout(10000);
});
//# sourceMappingURL=useSendTransaction.test.js.map