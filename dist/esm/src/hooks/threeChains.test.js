/* eslint react-hooks/rules-of-hooks: 0 */
import { MockProvider } from 'ethereum-waffle';
import { useCall, useCalls } from './useCall';
import { SECOND_TEST_CHAIN_ID, renderDAppHook, waitUntil } from '../testing';
import { constants } from 'ethers';
import { deployContract, solidity } from 'ethereum-waffle';
import { doublerContractABI, MultiCall, timestampContractABI } from '../constants/abi';
import { expect, use } from 'chai';
import { randomInt } from 'crypto';
use(solidity);
const FIRST_TEST_CHAIN_ID = 1337;
const THIRD_TEST_CHAIN_ID = 31338;
const chainIds = [FIRST_TEST_CHAIN_ID, SECOND_TEST_CHAIN_ID, THIRD_TEST_CHAIN_ID];
describe('useCall - three chains', () => {
    const chains = {};
    function extractFromChains(prop) {
        const entries = Object.entries(chains).map(([chainId, data]) => [chainId, data[prop]]);
        const filteredEntries = entries.filter(([, value]) => value !== undefined);
        return Object.fromEntries(filteredEntries);
    }
    for (const chainId of chainIds) {
        const provider = new MockProvider({ ganacheOptions: { chain: { chainId } } });
        const [deployer] = provider.getWallets();
        chains[chainId] = {
            provider,
            deployer,
        };
        const mineBlock = async () => {
            if (!chains[chainId].isBlockMining) {
                chains[chainId].isBlockMining = true;
                const tx = await deployer.sendTransaction({ to: constants.AddressZero, value: 0 });
                await tx.wait();
                chains[chainId].isBlockMining = false;
            }
        };
        chains[chainId].mineBlock = mineBlock;
    }
    beforeEach(async () => {
        for (const [, chain] of Object.entries(chains)) {
            chain.timestampContract = await deployContract(chain.deployer, timestampContractABI);
            chain.doublerContract = await deployContract(chain.deployer, doublerContractABI);
            chain.multicallAddress = (await deployContract(chain.deployer, MultiCall)).address;
            if (chain.mineBlock) {
                chain.mineBlockTimerId = +setInterval(chain.mineBlock, (randomInt(10) + 1) * 10);
            }
        }
    });
    afterEach(async () => {
        for (const [, chain] of Object.entries(chains)) {
            clearInterval(chain.mineBlockTimerId);
        }
        await waitUntil(() => {
            for (const [, chain] of Object.entries(chains)) {
                if (chain.isBlockMining) {
                    return false;
                }
            }
            return true;
        });
    });
    const numberOfCalls = 100;
    const useTimestamps = (chainId) => useCall({
        contract: chains[chainId].timestampContract,
        method: 'getTimestamp',
        args: [numberOfCalls],
    }, { chainId });
    const useDoubler = (chainId) => (arr) => useCalls(arr === undefined
        ? []
        : arr.map((timestamp) => ({
            contract: chains[chainId].doublerContract,
            method: 'double',
            args: [timestamp],
        })), { chainId });
    for (let num = 0; num < 5; num++) {
        it('Test #' + num, async () => {
            var _a, _b, _c, _d;
            const { result, waitForCurrent } = await renderDAppHook(() => {
                const timestampsFirstChain = useTimestamps(FIRST_TEST_CHAIN_ID);
                const timestampsSecondChain = useTimestamps(SECOND_TEST_CHAIN_ID);
                const timestampsThirdChain = useTimestamps(THIRD_TEST_CHAIN_ID);
                const dTimestampsFirstChain = useDoubler(FIRST_TEST_CHAIN_ID)(timestampsFirstChain === null || timestampsFirstChain === void 0 ? void 0 : timestampsFirstChain.value[0]);
                const dTimestampsSecondChain = useDoubler(SECOND_TEST_CHAIN_ID)(timestampsSecondChain === null || timestampsSecondChain === void 0 ? void 0 : timestampsSecondChain.value[0]);
                const dTimestampsThirdChain = useDoubler(THIRD_TEST_CHAIN_ID)(timestampsThirdChain === null || timestampsThirdChain === void 0 ? void 0 : timestampsThirdChain.value[0]);
                return {
                    timestamps: {
                        [FIRST_TEST_CHAIN_ID]: timestampsFirstChain,
                        [SECOND_TEST_CHAIN_ID]: timestampsSecondChain,
                        [THIRD_TEST_CHAIN_ID]: timestampsThirdChain,
                    },
                    doubled: {
                        [FIRST_TEST_CHAIN_ID]: dTimestampsFirstChain,
                        [SECOND_TEST_CHAIN_ID]: dTimestampsSecondChain,
                        [THIRD_TEST_CHAIN_ID]: dTimestampsThirdChain,
                    },
                };
            }, {
                config: {
                    readOnlyChainId: FIRST_TEST_CHAIN_ID,
                    readOnlyUrls: extractFromChains('provider'),
                    multicallAddresses: extractFromChains('multicallAddress'),
                    refresh: 'never',
                },
            });
            await waitForCurrent((value) => chainIds.every((chainId) => {
                var _a;
                const result = (_a = value === null || value === void 0 ? void 0 : value.doubled) === null || _a === void 0 ? void 0 : _a[chainId];
                if ((result === null || result === void 0 ? void 0 : result.length) !== numberOfCalls) {
                    return false;
                }
                return result.every((value) => value !== undefined);
            }));
            for (const chainId of chainIds) {
                const timestamps = result.current.timestamps[chainId];
                const doubled = result.current.doubled[chainId];
                for (let i = 0; i < ((_a = timestamps === null || timestamps === void 0 ? void 0 : timestamps.value[0]) === null || _a === void 0 ? void 0 : _a.length); i++) {
                    expect((_c = (_b = timestamps === null || timestamps === void 0 ? void 0 : timestamps.value[0]) === null || _b === void 0 ? void 0 : _b[i]) === null || _c === void 0 ? void 0 : _c.mul(2)).to.eq((_d = doubled[i]) === null || _d === void 0 ? void 0 : _d.value[0]);
                }
            }
        }).timeout(12000);
    }
});
//# sourceMappingURL=threeChains.test.js.map