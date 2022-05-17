import { AccountInfo, PublicKey } from '@solana/web3.js';

export interface TokenAccount {
    pubkey: PublicKey;
    account: AccountInfo<Buffer> | null;
    effectiveMint: PublicKey;
    amount: number;
  }