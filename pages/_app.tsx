import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { config, INITIAL_CHAIN } from '../config/wagmiProvider';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={INITIAL_CHAIN}
          locale="en-US"
          theme={darkTheme()}
        >
          <Toaster />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
