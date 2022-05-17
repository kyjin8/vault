import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ToastContainer, toast } from 'react-toastify';
import { isDesktop } from 'react-device-detect';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import {
  getLedgerWallet,
  getPhantomWallet,
  getSolflareWallet,
  getSolflareWebWallet,
  getSolletExtensionWallet,
  getSolletWallet,
  getSolongWallet,
} from '@solana/wallet-adapter-wallets';
// import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, useMemo } from 'react';

import Routes from './Routes';

import '@solana/wallet-adapter-react-ui/styles.css';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const Wallet: FC = () => {
  const network = WalletAdapterNetwork.Mainnet;

  const endpoint = process.env.REACT_APP_SOLANA_API_ENDPOINT || '';

  let walletFactory = () => [
    getPhantomWallet(),
    getSolflareWebWallet(),
    getSolflareWallet(),
    getSolletWallet({ network }),
    getSolletExtensionWallet({ network }),
    getLedgerWallet(),
    getSolongWallet(),
  ];
  if (!isDesktop) {
    walletFactory = () => [getPhantomWallet(), getSolflareWebWallet(), getSolletWallet({ network })];
  }
  // @solana/wallet-adapter-wallets imports all the adapters but supports tree shaking --
  // Only the wallets you want to support will be compiled into your application
  const wallets = useMemo(walletFactory, [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        onError={(e: WalletError) => {
          if (e && e.message) {
            toast.error(e.message);
          }
        }}
      >
        <QueryClientProvider client={queryClient}>
          <WalletModalProvider featuredWallets={5}>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </WalletModalProvider>
        </QueryClientProvider>
      </WalletProvider>
      <ToastContainer position="bottom-left" autoClose={5000} pauseOnHover pauseOnFocusLoss closeOnClick={false} />
    </ConnectionProvider>
  );
};

export default Wallet;
