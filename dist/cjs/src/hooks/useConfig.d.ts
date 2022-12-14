import { Chain, FullConfig } from '../constants';
/**
 * Returns singleton instance of {@link Config}.
 * Takes no parameters.
 * @public
 */
export declare function useConfig(): FullConfig | Record<string, never>;
/**
 * @public
 */
export declare function useUpdateConfig(): (config: {
    readOnlyChainId?: number | undefined;
    readOnlyUrls?: import("../constants").NodeUrls | undefined;
    multicallAddresses?: import("../constants").MulticallAddresses | undefined;
    multicallVersion?: 1 | 2 | undefined;
    fastMulticallEncoding?: boolean | undefined;
    noMetamaskDeactivate?: boolean | undefined;
    supportedChains?: number[] | undefined;
    networks?: Chain[] | undefined;
    pollingInterval?: number | undefined;
    pollingIntervals?: import("../constants").PollingIntervals | undefined;
    notifications?: {
        checkInterval?: number | undefined;
        expirationPeriod?: number | undefined;
    } | undefined;
    localStorage?: {
        transactionPath: string;
    } | undefined;
    gasLimitBufferPercentage?: number | undefined;
    bufferGasLimitPercentage?: number | undefined;
    autoConnect?: boolean | undefined;
    refresh?: number | "never" | "everyBlock" | undefined;
    localStorageOverride?: Storage | undefined;
    connectors?: {
        [key: string]: import("../providers").Connector;
    } | undefined;
}) => void;
//# sourceMappingURL=useConfig.d.ts.map