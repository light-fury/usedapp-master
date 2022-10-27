import { jsx as _jsx } from "react/jsx-runtime";
import { providers } from 'ethers';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useConfig, useLocalStorage } from '../../../hooks';
import { ConnectorController } from './connectorController';
import { InjectedConnector } from './implementations';
const Provider = providers.Provider;
const Web3Provider = providers.Web3Provider;
export const ConnectorContext = createContext({
    connector: undefined,
    //eslint-disable-next-line @typescript-eslint/no-empty-function
    activate: async () => { },
    //eslint-disable-next-line @typescript-eslint/no-empty-function
    deactivate: () => { },
    //eslint-disable-next-line @typescript-eslint/no-empty-function
    activateBrowserWallet: () => { },
    //eslint-disable-next-line @typescript-eslint/no-empty-function
    reportError: () => { },
    isLoading: false,
});
export function ConnectorContextProvider({ children }) {
    const [controller, setController] = useState();
    const [isLoading, setLoading] = useState(false);
    const config = useConfig();
    const { connectors, autoConnect } = config;
    const [autoConnectTag, setAutoConnectTag] = useLocalStorage('usedapp:autoConnectTag');
    const activate = useCallback(async (providerOrConnector, silently = false) => {
        let controller;
        if ('activate' in providerOrConnector) {
            controller = new ConnectorController(providerOrConnector, config);
        }
        else {
            const wrappedProvider = Provider.isProvider(providerOrConnector)
                ? providerOrConnector
                : new Web3Provider(providerOrConnector);
            controller = new ConnectorController(new InjectedConnector(wrappedProvider), config);
        }
        setLoading(true);
        try {
            if (silently) {
                await controller.activate((connector) => connector.connectEagerly());
            }
            else {
                await controller.activate();
            }
            setController(controller);
            setLoading(false);
        }
        catch (error) {
            controller.reportError(error);
        }
        finally {
            setLoading(false);
        }
    }, [setController, setLoading]);
    const activateBrowserWallet = useCallback(async ({ type } = { type: 'metamask' }) => {
        if (!connectors[type]) {
            throw new Error(`Connector ${type} is not configured`);
        }
        await activate(connectors[type]);
        setAutoConnectTag(type);
    }, [activate, setAutoConnectTag, connectors]);
    useEffect(() => {
        if (autoConnect && autoConnectTag && connectors[autoConnectTag]) {
            void activate(connectors[autoConnectTag], true);
        }
    }, []);
    useEffect(() => {
        controller === null || controller === void 0 ? void 0 : controller.updateConfig(config);
    }, [controller, config]);
    return (_jsx(ConnectorContext.Provider, Object.assign({ value: {
            connector: controller,
            deactivate: async () => {
                setAutoConnectTag(undefined);
                setLoading(true);
                await (controller === null || controller === void 0 ? void 0 : controller.deactivate());
                setController(undefined);
                setLoading(false);
            },
            reportError: (err) => {
                controller === null || controller === void 0 ? void 0 : controller.reportError(err);
            },
            activate,
            activateBrowserWallet,
            isLoading,
        } }, { children: children })));
}
export const useConnector = () => useContext(ConnectorContext);
//# sourceMappingURL=context.js.map