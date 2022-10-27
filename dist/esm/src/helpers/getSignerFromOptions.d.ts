import { ethers, providers } from 'ethers';
import { TransactionOptions } from '../model';
declare type BaseProvider = providers.BaseProvider;
declare type JsonRpcProvider = providers.JsonRpcProvider;
declare type FallbackProvider = providers.FallbackProvider;
export declare const getSignerFromOptions: (provider: BaseProvider, options?: TransactionOptions, library?: JsonRpcProvider | FallbackProvider) => ethers.Signer | ethers.providers.JsonRpcSigner | ethers.Wallet | undefined;
export {};
//# sourceMappingURL=getSignerFromOptions.d.ts.map