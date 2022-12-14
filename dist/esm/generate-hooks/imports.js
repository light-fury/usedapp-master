import * as path from 'path';
export const commonImports = `
import { Falsy, Params, QueryParams, TransactionOptions, useCall, useContractFunction } from '@usedapp/core'
import { Contract, utils } from 'ethers'
`;
export const imports = ({ typesDir, outDir, contractName }) => `
import { ${contractName}, ${contractName}__factory } from '${path.relative(outDir, typesDir)}'
const ${contractName}Interface = new utils.Interface(${contractName}__factory.abi)

`;
//# sourceMappingURL=imports.js.map