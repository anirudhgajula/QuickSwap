'use client';

import '@/styles/globals.css'
import { WagmiConfig, createClient, configureChains, goerli, Chain } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { besu } from '../besu'
import NavBar from '../components/NavBar'

import type { AppProps } from 'next/app'

let myMap = new Map<Chain, string>([
  [goerli, 'ant-node-9937'],
  [besu, 'swaptestnetwork-aa2d']
]);

const { chains, provider } = configureChains(
  [goerli, besu],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://${myMap.get(chain)}.settlemint.com/bpaas-ca71Fe457d9e76c408628c9A55aDd7e918c0dC2D`,
      }),
    }),
  ],
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return(
    <div className="bg-[#1c589d]">
      <NavBar></NavBar>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </div>
    
  );
}
