import { expect } from 'chai';
import { transactionReducer } from './reducer';
describe('transactionsReducer', () => {
    it('addTransaction', () => {
        const transaction = {
            transaction: { chainId: 1 },
            submittedAt: 10,
        };
        expect(transactionReducer({}, { type: 'ADD_TRANSACTION', payload: transaction })).to.deep.eq({
            1: [transaction],
        });
    });
    it('updateTransaction', () => {
        const transaction = {
            transaction: { chainId: 1 },
            submittedAt: 10,
        };
        const state = transactionReducer({}, { type: 'ADD_TRANSACTION', payload: transaction });
        expect(state).to.deep.eq({
            1: [transaction],
        });
        const updatedTransaction = Object.assign(Object.assign({}, transaction), { receipt: { status: 1 } });
        expect(transactionReducer(state, { type: 'UPDATE_TRANSACTION', payload: updatedTransaction })).to.deep.eq({
            1: [updatedTransaction],
        });
    });
    it('correct order', () => {
        const initial = {
            transaction: { chainId: 1 },
            submittedAt: 10,
        };
        const added = {
            transaction: { chainId: 1 },
            submittedAt: 30,
        };
        const newState = transactionReducer({ 1: [initial] }, { type: 'ADD_TRANSACTION', payload: added });
        expect(newState).to.deep.eq({ 1: [added, initial] });
    });
    it('update transactions', () => {
        const initialTransactions = [
            { transaction: { chainId: 1 }, submittedAt: 10 },
            { transaction: { chainId: 1 }, submittedAt: 15 },
            { transaction: { chainId: 1 }, submittedAt: 20 },
        ];
        const newTransactions = initialTransactions.map((tx) => (Object.assign(Object.assign({}, tx), { lastCheckedBlockNumber: 12 })));
        const newState = transactionReducer({ 1: initialTransactions }, { type: 'UPDATE_TRANSACTIONS', chainId: 1, transactions: newTransactions });
        expect(newState).to.deep.eq({ 1: newTransactions });
    });
});
//# sourceMappingURL=transactionsReducer.test.js.map