import { ethers, providers } from 'ethers';
import { TransactionOptions } from '../model';
declare type BaseProvider = providers.BaseProvider;
export declare const getSignerFromOptions: (provider: BaseProvider, options?: TransactionOptions | undefined, library?: ethers.providers.JsonRpcProvider | ethers.providers.FallbackProvider | undefined) => ethers.Signer | undefined;
export {};
//# sourceMappingURL=getSignerFromOptions.d.ts.map