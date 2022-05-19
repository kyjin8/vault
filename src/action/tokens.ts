import _ from 'lodash';
import { TokenAmount } from '../utils/safe-math';

export interface TokenInfo {
    symbol: string;
    name: string;
    pc?: TokenInfo;
    coin?: TokenInfo;

    mintAddress: string;
    decimals: number;
    totalSupply?: TokenAmount;

    referrer?: string;

    details?: string;
    // docs?: object;
    // socials?: object;

    tokenAccountAddress?: string;
    balance?: TokenAmount;
    tags: string[];
    picUrl?: string;
}

interface Tokens {
    [key: string]: any;
    [index: number]: {
        symbol: string;
        name: string;
        mintAddress: string;
        decimals: number;
        picUrl: string;
    };
}

export const TOKENS: Tokens = {
    SSU: {
        mintAddress: 'AGkFkKgXUEP7ZXazza5a25bSKbz5dDpgafPhqywuQnpf',
        symbol: 'SSU',
        name: 'SunnySideUp Token',
        decimals: 9,
        picUrl:
            'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AGkFkKgXUEP7ZXazza5a25bSKbz5dDpgafPhqywuQnpf/logo.png',
    },
    BTC: {
        mintAddress: '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E',
        symbol: 'BTC',
        name: 'Wrapped Bitcoin (Sollet)',
        decimals: 6,
        picUrl:
            'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
    },
    ETH: {
        mintAddress: '2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk',
        symbol: 'ETH',
        name: 'Wrapped Ethereum (Sollet)',
        decimals: 6,
        picUrl:
            'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk/logo.png',
    },
    USDT: {
        mintAddress: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
        symbol: 'USDT',
        name: 'USDT',
        decimals: 6,
        picUrl:
            'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg',
    },
    USDC: {
        mintAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
        picUrl:
            'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    },
}
// export const TOKENS_ARRAY = _.valuesIn(TOKENS);