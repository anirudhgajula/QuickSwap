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
        url: "https://goerli.etherscan.io"
      },
      default: {
        name: "Etherscan",
        url: "https://goerli.etherscan.io"
      }
    },
    contracts: {
      ensRegistry: {
        address: "0x"
      },
      ensUniversalResolver: {
        address: "0x",
        blockCreated: 0
      },
      multicall3: {
        address: "0x",
        blockCreated: 0
      }
    },
    testnet: true
  } as const satisfies Chain;