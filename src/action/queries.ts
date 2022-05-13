import { Connection } from '@solana/web3.js';
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

const solanaRPCUrl = process.env.REACT_APP_SOLANA_API_ENDPOINT || '';

export const SAMPLE_HISTORY_HOURS = 6; // solana explorer

const getavgSlotTIme1H = async (connection: Connection) => {
  const performanceSamples = await connection.getRecentPerformanceSamples(60 * SAMPLE_HISTORY_HOURS);

  const samples = performanceSamples
    .filter((sample) => {
      return sample.numSlots !== 0;
    })
    .map((sample) => {
      return sample.samplePeriodSecs / sample.numSlots;
    })
    .slice(0, 60);

  const samplesInHour = samples.length < 60 ? samples.length : 60;
  const avgSlotTime1h =
    samples.reduce((sum: number, cur: number) => {
      return sum + cur;
    }, 0) / samplesInHour;

  return avgSlotTime1h;
};

export const useEpochInfo = () => {
  return useQuery(
    QUERY_KEY.EPOCH_INFO,
    async () => {
      const connection = new Connection(solanaRPCUrl);

      const { epoch, slotIndex, slotsInEpoch } = await connection.getEpochInfo();
      const avgSlotTime1h = await getavgSlotTIme1H(connection);

      return {
        currentEpoch: epoch,
        progress: (100 * slotIndex) / slotsInEpoch,
        msUntilNextEpoch: (slotsInEpoch - slotIndex) * avgSlotTime1h * 1000,
      };
    },
    {
      cacheTime: Infinity,
      staleTime: 30 * 1000,
    },
  );
};

export const OperationEpochInfo = (oper_start: number, oper_end: number) => {
  return useQuery(
    QUERY_KEY.EPOCH_INFO,
    async () => {
      const connection = new Connection(solanaRPCUrl);

      const { epoch, slotIndex, slotsInEpoch } = await connection.getEpochInfo();
      const avgSlotTime1h = await getavgSlotTIme1H(connection);
      // progress
      const TotalEpochSlots = (oper_end - oper_start) * slotsInEpoch;
      const CurrEpochSlots = (epoch - oper_start) * slotsInEpoch + slotIndex;
      // msUntilEndEpoch
      // const TotalRemainSlots =
      //   (oper_end - epoch - 1) * slotsInEpoch + (slotsInEpoch - slotIndex);
      // console.log("그냥 구한거", TotalRemainSlots);
      // console.log("뺀거", TotalEpochSlots - CurrEpochSlots);
      console.log((TotalEpochSlots - CurrEpochSlots) * avgSlotTime1h * 1000);

      return {
        currentEpoch: epoch,
        progress: (100 * CurrEpochSlots) / TotalEpochSlots,
        msUntilEndEpoch: (TotalEpochSlots - CurrEpochSlots) * avgSlotTime1h * 1000,
      };
    },
    {
      cacheTime: Infinity,
      staleTime: 30 * 1000,
    },
  );
};

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
