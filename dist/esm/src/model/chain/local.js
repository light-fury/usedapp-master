export const Localhost = {
    chainId: 1337,
    chainName: 'Localhost',
    isTestChain: true,
    isLocalChain: true,
    multicallAddress: '',
    rpcUrl: 'http://localhost:8545',
    getExplorerAddressLink: () => '',
    getExplorerTransactionLink: () => '',
};
export const Hardhat = {
    chainId: 31337,
    chainName: 'Hardhat',
    isTestChain: true,
    isLocalChain: true,
    multicallAddress: '',
    rpcUrl: 'http://localhost:8545',
    getExplorerAddressLink: () => '',
    getExplorerTransactionLink: () => '',
};
export default {
    Localhost,
    Hardhat,
};
//# sourceMappingURL=local.js.map