import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig, mainnet } from 'wagmi';
import { arbitrum, base, avalanche } from 'wagmi/chains';
import './index.css';

import { createClient } from '@connect2ic/core';
import { defaultProviders } from '@connect2ic/core/providers';
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
} from '@connect2ic/react';
import '@connect2ic/core/style.css';

// import * as backend from '../.dfx/local/canisters/backend/backend.did.js';

const projectId = '0525c5b585040cf25b4c5274ba3e4fbf';

const metadata = {
  name: 'Web3Modal',
  description: 'social-valley',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const chains = [mainnet, arbitrum, base, avalanche];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const client = createClient({
  canisters: {},
  providers: defaultProviders as any,
  globalProviderConfig: {
    dev: import.meta.env.DEV,
  },
});

root.render(
  <Connect2ICProvider client={client}>
    <WagmiConfig config={wagmiConfig}>
      <App />
    </WagmiConfig>
  </Connect2ICProvider>,
);
