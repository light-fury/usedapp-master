import { createContext, useContext } from 'react';
/**
 * @internal Intended for internal use - use it on your own risk
 */
export const WindowContext = createContext(true);
/**
 * @internal
 */
export function useWindow() {
    return useContext(WindowContext);
}
//# sourceMappingURL=context.js.map