import { providers } from 'ethers';
import { ReactNode } from 'react';
import { Connector } from './connector';
import { ConnectorController } from './connectorController';
declare type JsonRpcProvider = providers.JsonRpcProvider;
declare type ExternalProvider = providers.ExternalProvider;
export declare type ActivateBrowserWallet = (arg?: {
    type: string;
}) => void;
interface ConnectorContextValue {
    connector: ConnectorController | undefined;
    activate: (providerOrConnector: JsonRpcProvider | ExternalProvider | Connector) => Promise<void>;
    deactivate: () => void;
    activateBrowserWallet: ActivateBrowserWallet;
    reportError: (error: Error) => void;
    isLoading: boolean;
}
export declare const ConnectorContext: import("react").Context<ConnectorContextValue>;
export interface ConnectorContextProviderProps {
    children?: ReactNode;
}
export declare function ConnectorContextProvider({ children }: ConnectorContextProviderProps): JSX.Element;
export declare const useConnector: () => ConnectorContextValue;
export {};
//# sourceMappingURL=context.d.ts.map