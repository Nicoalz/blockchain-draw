import { createClient } from 'viem';
import { baseSepolia } from 'wagmi/chains';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { createConfig, http } from 'wagmi';
import {
  metaMaskWallet,
  rabbyWallet,
  injectedWallet,
} from '@rainbow-me/rainbowkit/wallets';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Suggested',
      wallets: [rabbyWallet, metaMaskWallet],
    },
    {
      groupName: 'All',
      wallets: [injectedWallet, rabbyWallet, metaMaskWallet],
    },
  ],
  { appName: 'RainbowKit App', projectId: 'YOUR_PROJECT_ID' },
);

export const config = createConfig({
  connectors,
  chains: [baseSepolia],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
  ssr: true, // true If your dApp uses server side rendering (SSR)
});

export const INITIAL_CHAIN = baseSepolia;

// in case of multiple chains
export const chainIds = {
  sepolia: baseSepolia.id,
};
