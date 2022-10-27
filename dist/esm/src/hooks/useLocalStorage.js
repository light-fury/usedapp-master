import { useEffect, useState } from 'react';
import LocalStorage from '../helpers/LocalStorage';
import { useConfig } from './useConfig';
function getItem(key, storage) {
    const item = storage.getItem(key);
    if (item !== null) {
        try {
            return JSON.parse(item);
        }
        catch (_a) {
            // ignore error
        }
    }
}
function setItem(key, value, storage) {
    if (value === undefined) {
        storage.removeItem(key);
    }
    else {
        const toStore = JSON.stringify(value);
        storage.setItem(key, toStore);
        return JSON.parse(toStore);
    }
}
/**
 * @internal Intended for internal use - use it on your own risk
 */
export function useLocalStorage(key) {
    const { localStorageOverride = typeof window !== 'undefined' ? window.localStorage : new LocalStorage(), } = useConfig();
    const [value, setValue] = useState(() => getItem(key, localStorageOverride));
    useEffect(() => {
        setValue(getItem(key, localStorageOverride));
    }, [key]);
    useEffect(() => {
        setItem(key, value, localStorageOverride);
    }, [value]);
    // As value updating relies on useEffect, it takes multiple rerenders to fully update the value.
    // The third element in the return array allows to get the immediate value stored in the localStorage.
    return [value, setValue, () => getItem(key, localStorageOverride)];
}
//# sourceMappingURL=useLocalStorage.js.map