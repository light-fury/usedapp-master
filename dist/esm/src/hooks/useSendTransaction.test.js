import { useSendTransaction } from '../../src';
import { expect } from 'chai';
import { BigNumber, utils, ethers } from 'ethers';
import { setupTestingConfig, renderDAppHook } from '../../src/testing';
import { parseEther } from 'ethers/lib/utils';
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
        ({ config, network1 } = await setupTestingConfig());
        wallet2 = network1.wallets[0];
        wallet1 = ethers.Wallet.fromMnemonic('radar blur cabbage chef fix engine embark joy scheme fiction master release').connect(network1.provider);
        // Top up the wallet because it has 0 funds initially - on both providers.
        await network1.wallets[0].sendTransaction({ to: wallet1.address, value: parseEther('1') });
        spender = network1.deployer;
        receiver = network1.wallets[0];
        secondReceiver = network1.wallets[1];
    });
    it('success', async () => {
        const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(useSendTransaction, { config });
        await waitForNextUpdate();
        const receipt = await result.current.sendTransaction({ to: wallet1.address, value: BigNumber.from(10) });
        await waitForCurrent((val) => val.state !== undefined);
        expect(result.current.state.status).to.eq('Success');
        await expect(await network1.provider.getTransaction(receipt.transactionHash)).to.changeEtherBalances([network1.deployer, wallet1], ['-10', '10']);
    });
    it('sends with different signer', async () => {
        const receiverBalance = await receiver.getBalance();
        const secondReceiverBalance = await secondReceiver.getBalance();
        const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(() => useSendTransaction({ signer: receiver }), {
            config,
        });
        await waitForNextUpdate();
        await result.current.sendTransaction({ to: secondReceiver.address, value: BigNumber.from(10) });
        await waitForCurrent((val) => val.state != undefined);
        expect(result.current.state.status).to.eq('Success');
        expect(await secondReceiver.getBalance()).to.eq(secondReceiverBalance.add(10));
        expect(await receiver.getBalance()).to.not.eq(receiverBalance);
    });
    it('Exception(invalid sender)', async () => {
        const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(useSendTransaction, { config });
        await waitForNextUpdate();
        await result.current.sendTransaction({ to: '0x1', value: utils.parseEther('1') });
        await waitForCurrent((val) => val.state !== undefined);
        expect(result.current.state.status).to.eq('Exception');
        expect(result.current.state.errorMessage).to.eq('invalid address');
    });
    it('transfer ether with limit', async () => {
        var _a;
        const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(() => useSendTransaction({ signer: wallet1 }), {
            config: Object.assign(Object.assign({}, config), { gasLimitBufferPercentage: 100 }),
        });
        await waitForNextUpdate();
        await result.current.sendTransaction({ to: wallet2.address, value: BigNumber.from(10) });
        await waitForCurrent((val) => val.state !== undefined);
        expect(result.current.state.status).to.eq('Success');
        expect((_a = result.current.state.transaction) === null || _a === void 0 ? void 0 : _a.gasLimit.toNumber()).to.equal(2 * BASE_TX_COST);
    });
    it('transfer ether with limit in args', async () => {
        var _a;
        const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(() => useSendTransaction({
            signer: wallet1,
            gasLimitBufferPercentage: 100,
        }), {
            config,
        });
        await waitForNextUpdate();
        await result.current.sendTransaction({ to: wallet2.address, value: BigNumber.from(10) });
        await waitForCurrent((val) => val.state !== undefined);
        expect(result.current.state.status).to.eq('Success');
        expect(result.current.state.status).to.eq('Success');
        expect((_a = result.current.state.transaction) === null || _a === void 0 ? void 0 : _a.gasLimit.toNumber()).to.equal(2 * BASE_TX_COST);
    });
    it('Returns receipt after correct transaction', async () => {
        var _a, _b, _c, _d, _e, _f, _g;
        const { result, waitForCurrent } = await renderDAppHook(useSendTransaction, { config });
        const receiverBalance = await receiver.getBalance();
        await result.current.sendTransaction({ to: receiver.address, value: BigNumber.from(10) });
        await waitForCurrent((val) => val.state !== undefined);
        expect(result.current.state.status).to.eq('Success');
        expect(await receiver.getBalance()).to.eq(receiverBalance.add(10));
        expect(result.current.state.receipt).to.not.be.undefined;
        expect((_a = result.current.state.receipt) === null || _a === void 0 ? void 0 : _a.to).to.eq(receiver.address);
        expect((_b = result.current.state.receipt) === null || _b === void 0 ? void 0 : _b.from).to.eq(spender.address);
        expect((_c = result.current.state.receipt) === null || _c === void 0 ? void 0 : _c.gasUsed).to.be.gt(0);
        expect((_d = result.current.state.receipt) === null || _d === void 0 ? void 0 : _d.status).to.eq(1);
        expect((_e = result.current.state.receipt) === null || _e === void 0 ? void 0 : _e.blockHash).to.match(/^0x/);
        expect((_f = result.current.state.receipt) === null || _f === void 0 ? void 0 : _f.transactionHash).to.match(/^0x/);
        expect((_g = result.current.state.receipt) === null || _g === void 0 ? void 0 : _g.gasUsed).to.be.gt(0);
    });
    it('Can send transaction with private key', async () => {
        var _a, _b, _c, _d, _e, _f, _g;
        const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(() => useSendTransaction({ chainId: 1, privateKey: wallet1.privateKey }), { config });
        await waitForNextUpdate();
        const receipt = await result.current.sendTransaction({ to: wallet2.address, value: BigNumber.from(10) });
        await waitForCurrent((val) => val.state !== undefined);
        expect(result.current.state.status).to.eq('Success');
        const tx = await network1.provider.getTransaction(receipt.transactionHash);
        await expect(tx).to.changeEtherBalances([wallet1, wallet2], ['-10', '10']);
        expect(result.current.state.receipt).to.not.be.undefined;
        expect((_a = result.current.state.receipt) === null || _a === void 0 ? void 0 : _a.to).to.eq(wallet2.address);
        expect((_b = result.current.state.receipt) === null || _b === void 0 ? void 0 : _b.from).to.eq(wallet1.address);
        expect((_c = result.current.state.receipt) === null || _c === void 0 ? void 0 : _c.gasUsed).to.be.gt(0);
        expect((_d = result.current.state.receipt) === null || _d === void 0 ? void 0 : _d.status).to.eq(1);
        expect((_e = result.current.state.receipt) === null || _e === void 0 ? void 0 : _e.blockHash).to.match(/^0x/);
        expect((_f = result.current.state.receipt) === null || _f === void 0 ? void 0 : _f.transactionHash).to.match(/^0x/);
        expect((_g = result.current.state.receipt) === null || _g === void 0 ? void 0 : _g.gasUsed).to.be.gt(0);
    });
    it('Can send transaction with mnemonic phrase', async () => {
        var _a, _b, _c, _d, _e, _f, _g;
        const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(() => useSendTransaction({ chainId: 1, mnemonicPhrase: wallet1.mnemonic.phrase }), { config });
        await waitForNextUpdate();
        const receipt = await result.current.sendTransaction({ to: wallet2.address, value: BigNumber.from(10) });
        await waitForCurrent((val) => val.state !== undefined);
        expect(result.current.state.status).to.eq('Success');
        const tx = await network1.provider.getTransaction(receipt.transactionHash);
        await expect(tx).to.changeEtherBalances([wallet1, wallet2], ['-10', '10']);
        expect(result.current.state.receipt).to.not.be.undefined;
        expect((_a = result.current.state.receipt) === null || _a === void 0 ? void 0 : _a.to).to.eq(wallet2.address);
        expect((_b = result.current.state.receipt) === null || _b === void 0 ? void 0 : _b.from).to.eq(wallet1.address);
        expect((_c = result.current.state.receipt) === null || _c === void 0 ? void 0 : _c.gasUsed).to.be.gt(0);
        expect((_d = result.current.state.receipt) === null || _d === void 0 ? void 0 : _d.status).to.eq(1);
        expect((_e = result.current.state.receipt) === null || _e === void 0 ? void 0 : _e.blockHash).to.match(/^0x/);
        expect((_f = result.current.state.receipt) === null || _f === void 0 ? void 0 : _f.transactionHash).to.match(/^0x/);
        expect((_g = result.current.state.receipt) === null || _g === void 0 ? void 0 : _g.gasUsed).to.be.gt(0);
    });
    it('Can send transaction with encrypted json', async () => {
        var _a, _b, _c, _d, _e, _f, _g;
        const json = await wallet1.encrypt('test');
        const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(() => useSendTransaction({
            chainId: 1,
            password: 'test',
            json,
        }), { config });
        await waitForNextUpdate();
        const receipt = await result.current.sendTransaction({ to: wallet2.address, value: BigNumber.from(10) });
        await waitForCurrent((val) => val.state !== undefined);
        expect(result.current.state.status).to.eq('Success');
        const tx = await network1.provider.getTransaction(receipt.transactionHash);
        await expect(tx).to.changeEtherBalances([wallet1, wallet2], ['-10', '10']);
        expect(result.current.state.receipt).to.not.be.undefined;
        expect((_a = result.current.state.receipt) === null || _a === void 0 ? void 0 : _a.to).to.eq(wallet2.address);
        expect((_b = result.current.state.receipt) === null || _b === void 0 ? void 0 : _b.from).to.eq(wallet1.address);
        expect((_c = result.current.state.receipt) === null || _c === void 0 ? void 0 : _c.gasUsed).to.be.gt(0);
        expect((_d = result.current.state.receipt) === null || _d === void 0 ? void 0 : _d.status).to.eq(1);
        expect((_e = result.current.state.receipt) === null || _e === void 0 ? void 0 : _e.blockHash).to.match(/^0x/);
        expect((_f = result.current.state.receipt) === null || _f === void 0 ? void 0 : _f.transactionHash).to.match(/^0x/);
        expect((_g = result.current.state.receipt) === null || _g === void 0 ? void 0 : _g.gasUsed).to.be.gt(0);
    }).timeout(10000);
});
//# sourceMappingURL=useSendTransaction.test.js.map