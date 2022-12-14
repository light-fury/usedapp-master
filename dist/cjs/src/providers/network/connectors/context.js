"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConnector = exports.ConnectorContextProvider = exports.ConnectorContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ethers_1 = require("ethers");
const react_1 = require("react");
const hooks_1 = require("../../../hooks");
const connectorController_1 = require("./connectorController");
const implementations_1 = require("./implementations");
const Provider = ethers_1.providers.Provider;
const Web3Provider = ethers_1.providers.Web3Provider;
exports.ConnectorContext = (0, react_1.createContext)({
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
function ConnectorContextProvider({ children }) {
    const [controller, setController] = (0, react_1.useState)();
    const [isLoading, setLoading] = (0, react_1.useState)(false);
    const config = (0, hooks_1.useConfig)();
    const { connectors, autoConnect } = config;
    const [autoConnectTag, setAutoConnectTag] = (0, hooks_1.useLocalStorage)('usedapp:autoConnectTag');
    const activate = (0, react_1.useCallback)(async (providerOrConnector, silently = false) => {
        let controller;
        if ('activate' in providerOrConnector) {
            controller = new connectorController_1.ConnectorController(providerOrConnector, config);
        }
        else {
            const wrappedProvider = Provider.isProvider(providerOrConnector)
                ? providerOrConnector
                : new Web3Provider(providerOrConnector);
            controller = new connectorController_1.ConnectorController(new implementations_1.InjectedConnector(wrappedProvider), config);
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
    const activateBrowserWallet = (0, react_1.useCallback)(async ({ type } = { type: 'metamask' }) => {
        if (!connectors[type]) {
            throw new Error(`Connector ${type} is not configured`);
        }
        await activate(connectors[type]);
        setAutoConnectTag(type);
    }, [activate, setAutoConnectTag, connectors]);
    (0, react_1.useEffect)(() => {
        if (autoConnect && autoConnectTag && connectors[autoConnectTag]) {
            void activate(connectors[autoConnectTag], true);
        }
    }, []);
    (0, react_1.useEffect)(() => {
        controller === null || controller === void 0 ? void 0 : controller.updateConfig(config);
    }, [controller, config]);
    return ((0, jsx_runtime_1.jsx)(exports.ConnectorContext.Provider, { value: {
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
        }, children: children }));
}
exports.ConnectorContextProvider = ConnectorContextProvider;
const useConnector = () => (0, react_1.useContext)(exports.ConnectorContext);
exports.useConnector = useConnector;
//# sourceMappingURL=context.js.map