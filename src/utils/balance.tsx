// @ts-ignore
import tuple from 'immutable-tuple';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

import { AccountInfo, Connection, ParsedAccountData, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, Token, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';

import { TokenAccount } from './types';
import { ACCOUNT_LAYOUT, getBalance, getTokenBalance } from '../action/RequestWeb3';

import { useAsyncData } from './fetch-loop';
import { TokenAmount } from './safe-math';

export function getOwnedAccountsFilters(publicKey: PublicKey) {
    return [
        {
            memcmp: {
                offset: ACCOUNT_LAYOUT.offsetOf('owner'),
                bytes: publicKey.toBase58(),
            },
        },
        {
            dataSize: ACCOUNT_LAYOUT.span,
        },
    ];
}
export async function getOwnedTokenAccounts(
    connection: Connection,
    publicKey: PublicKey,
): Promise<Array<{ publicKey: PublicKey; accountInfo: AccountInfo<Buffer> }>> {
    const filters = getOwnedAccountsFilters(publicKey);
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    const resp = await connection.getProgramAccounts(TOKEN_PROGRAM_ID, {
        filters,
    });
    return resp.map(({ pubkey, account: { data, executable, owner, lamports } }) => ({
        publicKey: new PublicKey(pubkey),
        accountInfo: {
            data,
            executable,
            owner: new PublicKey(owner),
            lamports,
        },
    }));
}

export function parseTokenAccountData(data: Buffer): { mint: PublicKey; owner: PublicKey; amount: number } {
    const { mint, owner, amount } = ACCOUNT_LAYOUT.decode(data);
    return {
        mint: new PublicKey(mint),
        owner: new PublicKey(owner),
        amount,
    };
}

export async function getTokenAccountInfo(connection: Connection, ownerAddress: PublicKey) {
    const [splAccounts] = await Promise.all([getOwnedTokenAccounts(connection, ownerAddress)]);
    const parsedSplAccounts: TokenAccount[] = splAccounts.map(({ publicKey, accountInfo }) => {
        const tokenAccountData = parseTokenAccountData(accountInfo.data);
        return {
            pubkey: publicKey,
            account: accountInfo,
            effectiveMint: tokenAccountData.mint,
            amount: tokenAccountData.amount,
        };
    });
    return parsedSplAccounts;
}

const SLOW_REFRESH_INTERVAL = 60 * 1000;

export function useBalance() {
    const { connected, publicKey } = useWallet();
    const { connection } = useConnection();

    async function fetchData() {
        try {
            if (publicKey) {
                const balance = await getBalance(connection, publicKey);

                return balance;
            }
        } catch (e) {
            console.log(e);
        }

        return 0;
    }

    return useAsyncData(fetchData, tuple('getBalance', publicKey, connected), {
        refreshInterval: SLOW_REFRESH_INTERVAL,
    });
}

export function useTokenAccounts() {
    const { connected, publicKey } = useWallet();
    const { connection } = useConnection();

    async function fetchData() {
        try {
            if (publicKey) {
                const accounts = await connection.getParsedTokenAccountsByOwner(
                    publicKey,
                    { programId: TOKEN_PROGRAM_ID },
                    'confirmed',
                );

                const converter = (val: { pubkey: PublicKey; account: AccountInfo<ParsedAccountData> }) => {
                    const parsedInfo = val.account.data.parsed.info;

                    return {
                        publicKey: val.pubkey,
                        mintAddress: parsedInfo.mint,
                        balance: new TokenAmount(parsedInfo.tokenAmount.amount, parsedInfo.tokenAmount.decimals),
                    };
                };

                return accounts?.value?.map(converter) || [];
            }
            return [];
        } catch (e) {
            return [];
        }
    }
    return useAsyncData(fetchData, tuple('useTokenAccounts', publicKey, connected), {
        refreshInterval: SLOW_REFRESH_INTERVAL,
    });
}
