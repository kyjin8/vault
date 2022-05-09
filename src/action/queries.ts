import { useQuery } from 'react-query';
import axios from 'axios';

export enum QUERY_KEY {
  STAKING_STATE = 'stakingState',
  EPOCH_INFO = 'epochInfo',
  TOKEN_PRICE = 'tokenPrice',
  POOL_STATE = 'poolState',
  POOL_USER_STATE = 'poolUserState',
  ALOHA_POOL = 'alohaPool',
  ALOHA_AUCTION = 'alohaAuction',
  SOLFARM = 'solfarm',
  NETWORK_STATUS = 'networkStatus',
  COINMARKETCAP = 'coinmarketcap',
}

export type PoolInfoResult = {
  [key in string]: {
    /* eslint-disable-next-line camelcase */
    lp_mint: string;
    apy: number;
    name: string;
    liquidity: number;
    price: number;
    official: boolean;
  };
};

export const useSolfarm = () => {
  return useQuery(
    QUERY_KEY.SOLFARM,
    async () => {
      const req = await axios.get<PoolInfoResult>(
        'https://api.solfarm.io/pairs?pair=SOL-USDC,SSOL-SOL,RAY-SOL,BTC-USDC,ETH-USDC,USDT-USDC,SSU-SOL,RAY-USDC,ATLAS-USDC,POLIS-USDC,SSU-USDC,WBWBNB-USDC,SRM-USDC,FTT-USDC',
      );

      return req.data;
    },
    {
      cacheTime: Infinity,
      staleTime: 60 * 1000,
    },
  );
};

export const useCoinMarketCap = () => {
  return useQuery(
    QUERY_KEY.COINMARKETCAP,
    async () => {
      const btcprice = await axios.get('http://vault-dev.sunnysideup.finance/api/v1/assetInfo/coinPrice?symbol=btc');
      const ethprice = await axios.get('http://vault-dev.sunnysideup.finance/api/v1/assetInfo/coinPrice?symbol=eth');

      return {
        btcPrice: btcprice.data,
        ethPrice: ethprice.data,
      };
    },
    {
      cacheTime: Infinity,
      staleTime: 60 * 1000,
    },
  );
};
