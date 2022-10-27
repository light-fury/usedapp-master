import { RenderResult } from '@testing-library/react-hooks';
export declare const getWaitUtils: <TResult>(hookResult: RenderResult<TResult>) => {
    waitForCurrent: (predicate: (value: TResult) => boolean, step?: number, timeout?: number) => Promise<void>;
    waitForCurrentEqual: (value: TResult, step?: number, timeout?: number) => Promise<void>;
};
//# sourceMappingURL=waitUtils.d.ts.map