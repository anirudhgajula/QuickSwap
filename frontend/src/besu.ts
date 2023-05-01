import { Chain } from 'wagmi'

export const besu = {
    id: 44527,
    network: "besu",
    name: "ANT Network",
    nativeCurrency: { name: "ANT Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
      default: {
        http: ["https://ant-node-9937.settlemint.com/bpaas-ca71Fe457d9e76c408628c9A55aDd7e918c0dC2D"]
      },
      public: {
        http: ["https://ant-node-9937.settlemint.com/bpass-ca71Fe457d9e76c408628c9A55aDd7e918c0dC2D"]
      }
    },
    blockExplorers: {
      etherscan: {
        name: "Etherscan",
        url: "https://ant-node-9937.settlemint.com/bpaas-ca71Fe457d9e76c408628c9A55aDd7e918c0dC2D"
      },
      default: {
        name: "Etherscan",
        url: "https://ant-node-9937.settlemint.com/bpaas-ca71Fe457d9e76c408628c9A55aDd7e918c0dC2D"
      }
    },
    contracts: {
      ensRegistry: {
        address: "0x23EbAF1b0e0Fa4573A309CbDD2e3A78c56E7b9Fd"
      },
      ensUniversalResolver: {
        address: "0x23EbAF1b0e0Fa4573A309CbDD2e3A78c56E7b9Fd",
        blockCreated: 0
      },
      multicall3: {
        address: "0x23EbAF1b0e0Fa4573A309CbDD2e3A78c56E7b9Fd",
        blockCreated: 0
      }
    },
    testnet: true
  } as const satisfies Chain;