import { utils } from 'ethers';
import MultiCall from './MultiCall.json';
import MultiCall2 from './MultiCall2.json';
import ERC20 from './ERC20.json';
import ERC20Mock from './ERC20Mock.json';
import BlockNumberContract from './BlockNumber.json';
declare const MultiCallABI: utils.Interface;
export { MultiCall, MultiCallABI };
declare const MultiCall2ABI: utils.Interface;
export { MultiCall2, MultiCall2ABI };
declare const ERC20Interface: utils.Interface;
export { ERC20, ERC20Interface };
declare const ERC20MockInterface: utils.Interface;
export { ERC20Mock, ERC20MockInterface };
export { BlockNumberContract };
export * from './doubler';
export * from './timestamp';
export * from './reverter';
//# sourceMappingURL=index.d.ts.map