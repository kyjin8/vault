/* eslint-disable @typescript-eslint/ban-ts-comment, no-underscore-dangle, no-param-reassign */
/* eslint-disable no-plusplus, @typescript-eslint/no-use-before-define */

import {
  Connection,
  PublicKey,
  Transaction,
  LAMPORTS_PER_SOL,
  AccountInfo,
  Keypair,
  SystemProgram,
  Commitment,
  TransactionInstruction,
  SYSVAR_RENT_PUBKEY,
  AccountMeta,
  Signer,
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, Token, ASSOCIATED_TOKEN_PROGRAM_ID, AccountLayout } from '@solana/spl-token';
import { publicKey, struct, u32, u64, u8 } from '@project-serum/borsh';
import { initializeAccount } from '@project-serum/serum/lib/token-instructions';
import { SignerWalletAdapterProps } from '@solana/wallet-adapter-base';
import BN from 'bn.js';
// @ts-ignore
import BufferLayout from 'buffer-layout';

export const ACCOUNT_LAYOUT = struct([
  publicKey('mint'),
  publicKey('owner'),
  u64('amount'),
  u32('delegateOption'),
  publicKey('delegate'),
  u8('state'),
  u32('isNativeOption'),
  u64('isNative'),
  u64('delegatedAmount'),
  u32('closeAuthorityOption'),
  publicKey('closeAuthority'),
]);

export const getBalance = async (connection: Connection, pubKey: PublicKey | undefined): Promise<number> => {
  try {
    if (pubKey) {
      const balance = await connection.getBalance(pubKey);
      return balance / LAMPORTS_PER_SOL;
    }
  } catch (e) {
    console.error(e);
  }
  return 0;
};

export const getTokenBalance = async (connection: Connection, pubKey: PublicKey | undefined): Promise<number> => {
  try {
    if (pubKey) {
      const balance = await connection.getTokenAccountBalance(pubKey);
      return balance?.value?.uiAmount || 0;
    }
  } catch (e) {
    // console.error(e);
  }
  return 0;
};

export async function createTokenAccountTransaction({
  userAccount,
  mintPublicKey,
}: {
  userAccount: PublicKey;
  mintPublicKey: PublicKey;
}): Promise<{
  transaction: Transaction;
  newAccountPubkey: PublicKey;
}> {
  const transaction = new Transaction();
  const associatedAddress = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    mintPublicKey,
    userAccount,
  );

  transaction.add(
    Token.createAssociatedTokenAccountInstruction(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      mintPublicKey,
      associatedAddress,
      userAccount,
      userAccount,
    ),
  );

  return {
    transaction,
    newAccountPubkey: associatedAddress,
  };
}

export async function createProgramAccountIfNotExist(
  connection: Connection,
  account: string | undefined | null,
  owner: PublicKey,
  programId: PublicKey,
  lamports: number | null,
  layout: any,

  transaction: Transaction,
  signer: Array<Keypair>,
) {
  let publicKey;

  if (account) {
    publicKey = new PublicKey(account);
  } else {
    const newAccount = new Keypair();
    publicKey = newAccount.publicKey;

    transaction.add(
      SystemProgram.createAccount({
        fromPubkey: owner,
        newAccountPubkey: publicKey,
        lamports: lamports ?? (await connection.getMinimumBalanceForRentExemption(layout.span)),
        space: layout.span,
        programId,
      }),
    );

    signer.push(newAccount);
  }

  return publicKey;
}

export async function createTokenAccountIfNotExist(
  connection: Connection,
  account: string | undefined | null,
  owner: PublicKey,
  mintAddress: string,
  lamports: number | null,

  transaction: Transaction,
  signer: Array<Keypair>,
) {
  let publicKey;

  if (account) {
    publicKey = new PublicKey(account);
  } else {
    publicKey = await createProgramAccountIfNotExist(
      connection,
      account,
      owner,
      TOKEN_PROGRAM_ID,
      lamports,
      ACCOUNT_LAYOUT,
      transaction,
      signer,
    );

    transaction.add(
      initializeAccount({
        account: publicKey,
        mint: new PublicKey(mintAddress),
        owner,
      }),
    );
  }

  return publicKey;
}

export async function createAssociatedTokenAccountIfNotExist(
  account: string | undefined | null,
  owner: PublicKey,
  mintAddress: string,

  transaction: Transaction,
  atas: string[] = [],
) {
  let publicKey;
  if (account) {
    publicKey = new PublicKey(account);
  }

  const mint = new PublicKey(mintAddress);
  // @ts-ignore without ts ignore, yarn build will failed
  const ata = await Token.getAssociatedTokenAddress(ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, mint, owner, true);

  if ((!publicKey || !ata.equals(publicKey)) && !atas.includes(ata.toBase58())) {
    transaction.add(
      Token.createAssociatedTokenAccountInstruction(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        mint,
        ata,
        owner,
        owner,
      ),
    );
    atas.push(ata.toBase58());
  }

  return ata;
}

export async function getFilteredProgramAccounts(
  connection: Connection,
  programId: PublicKey,
  filters: any,
): Promise<{ publicKey: PublicKey; accountInfo: AccountInfo<Buffer> }[]> {
  // @ts-ignore
  const resp = await connection._rpcRequest('getProgramAccounts', [
    programId.toBase58(),
    {
      commitment: connection.commitment,
      filters,
      encoding: 'base64',
    },
  ]);
  if (resp.error) {
    throw new Error(resp.error.message);
  }
  // @ts-ignore
  return resp.result.map(({ pubkey, account: { data, executable, owner, lamports } }) => ({
    publicKey: new PublicKey(pubkey),
    accountInfo: {
      data: Buffer.from(data[0], 'base64'),
      executable,
      owner: new PublicKey(owner),
      lamports,
    },
  }));
}

export async function getFilteredProgramAccountsAmmOrMarketCache(
  cacheName: string,
  connection: Connection,
  programId: PublicKey,
  filters: any,
): Promise<{ publicKey: PublicKey; accountInfo: AccountInfo<Buffer> }[]> {
  try {
    if (!cacheName) {
      throw new Error('cacheName error');
    }

    const resp = await (await fetch(`https://api.raydium.io/cache/rpc/${cacheName}`)).json();
    if (resp.error) {
      throw new Error(resp.error.message);
    }
    // @ts-ignore
    return resp.result.map(({ pubkey, account: { data, executable, owner, lamports } }) => ({
      publicKey: new PublicKey(pubkey),
      accountInfo: {
        data: Buffer.from(data[0], 'base64'),
        executable,
        owner: new PublicKey(owner),
        lamports,
      },
    }));
  } catch (e) {
    return getFilteredProgramAccounts(connection, programId, filters);
  }
}

export async function findProgramAddress(seeds: Array<Buffer | Uint8Array>, programId: PublicKey) {
  const [publicKey, nonce] = await PublicKey.findProgramAddress(seeds, programId);
  return { publicKey, nonce };
}

/// sendTransaction

export function createAssociatedTokenAccountInstruction(
  payer: PublicKey,
  associatedToken: PublicKey,
  owner: PublicKey,
  mint: PublicKey,
  programId = TOKEN_PROGRAM_ID,
  associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID,
): TransactionInstruction {
  const keys = [
    { pubkey: payer, isSigner: true, isWritable: true },
    { pubkey: associatedToken, isSigner: false, isWritable: true },
    { pubkey: owner, isSigner: false, isWritable: false },
    { pubkey: mint, isSigner: false, isWritable: false },
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    { pubkey: programId, isSigner: false, isWritable: false },
    { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
  ];

  return new TransactionInstruction({
    keys,
    programId: associatedTokenProgramId,
    data: Buffer.alloc(0),
  });
}

export async function getAssociatedTokenAddress(
  mint: PublicKey,
  owner: PublicKey,
  allowOwnerOffCurve = false,
  programId = TOKEN_PROGRAM_ID,
  associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID,
): Promise<PublicKey> {
  if (!allowOwnerOffCurve && !PublicKey.isOnCurve(owner.toBuffer())) throw new Error('TokenOwnerOffCurveError');

  const [address] = await PublicKey.findProgramAddress(
    [owner.toBuffer(), programId.toBuffer(), mint.toBuffer()],
    associatedTokenProgramId,
  );

  return address;
}

export enum AccountState {
  Uninitialized = 0,
  Initialized = 1,
  Frozen = 2,
}

export async function getAccountInfo(
  connection: Connection,
  address: PublicKey,
  commitment?: Commitment,
  programId = TOKEN_PROGRAM_ID,
) {
  const info = await connection.getAccountInfo(address, commitment);
  if (!info) throw new Error('TokenAccountNotFoundError');
  if (!info.owner.equals(programId)) throw new Error('TokenInvalidAccountOwnerError');
  if (info.data.length !== AccountLayout.span) throw new Error('TokenInvalidAccountSizeError');

  const rawAccount = AccountLayout.decode(Buffer.from(info.data));

  return {
    address,
    mint: rawAccount.mint,
    owner: rawAccount.owner,
    amount: rawAccount.amount,
    delegate: rawAccount.delegateOption ? rawAccount.delegate : null,
    delegatedAmount: rawAccount.delegatedAmount,
    isInitialized: rawAccount.state !== AccountState.Uninitialized,
    isFrozen: rawAccount.state === AccountState.Frozen,
    isNative: !!rawAccount.isNativeOption,
    rentExemptReserve: rawAccount.isNativeOption ? rawAccount.isNative : null,
    closeAuthority: rawAccount.closeAuthorityOption ? rawAccount.closeAuthority : null,
  };
}

export async function getOrCreateAssociatedTokenAccount(
  connection: Connection,
  payer: PublicKey,
  mint: PublicKey,
  owner: PublicKey,
  signTransaction: SignerWalletAdapterProps['signTransaction'],
  allowOwnerOffCurve = false,
  commitment?: Commitment,
  programId = TOKEN_PROGRAM_ID,
  associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID,
) {
  const associatedToken = await getAssociatedTokenAddress(
    mint,
    owner,
    allowOwnerOffCurve,
    programId,
    associatedTokenProgramId,
  );

  // This is the optimal logic, considering TX fee, client-side computation, RPC roundtrips and guaranteed idempotent.
  // Sadly we can't do this atomically.
  let account;
  try {
    account = await getAccountInfo(connection, associatedToken, commitment, programId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // TokenAccountNotFoundError can be possible if the associated address has already received some lamports,
    // becoming a system account. Assuming program derived addressing is safe, this is the only case for the
    // TokenInvalidAccountOwnerError in this code path.
    if (error.message === 'TokenAccountNotFoundError' || error.message === 'TokenInvalidAccountOwnerError') {
      // As this isn't atomic, it's possible others can create associated accounts meanwhile.
      try {
        const transaction = new Transaction().add(
          createAssociatedTokenAccountInstruction(
            payer,
            associatedToken,
            owner,
            mint,
            programId,
            associatedTokenProgramId,
          ),
        );

        const blockHash = await connection.getRecentBlockhash();
        transaction.feePayer = await payer;
        transaction.recentBlockhash = await blockHash.blockhash;
        const signed = await signTransaction(transaction);

        const signature = await connection.sendRawTransaction(signed.serialize());

        await connection.confirmTransaction(signature);
      } catch (error: unknown) {
        // Ignore all errors; for now there is no API-compatible way to selectively ignore the expected
        // instruction error if the associated account exists already.
        console.log('AssociatedTokenAccount already existed');
      }

      // Now this should always succeed
      account = await getAccountInfo(connection, associatedToken, commitment, programId);
    } else {
      throw error;
    }
  }

  if (!account.mint.equals(mint.toBuffer())) throw Error('TokenInvalidMintError');
  if (!account.owner.equals(owner.toBuffer())) throw new Error('TokenInvalidOwnerError');

  return account;
}

export enum TokenInstruction {
  InitializeMint = 0,
  InitializeAccount = 1,
  InitializeMultisig = 2,
  Transfer = 3,
  Approve = 4,
  Revoke = 5,
  SetAuthority = 6,
  MintTo = 7,
  Burn = 8,
  CloseAccount = 9,
  FreezeAccount = 10,
  ThawAccount = 11,
  TransferChecked = 12,
  ApproveChecked = 13,
  MintToChecked = 14,
  BurnChecked = 15,
  InitializeAccount2 = 16,
  SyncNative = 17,
  InitializeAccount3 = 18,
  InitializeMultisig2 = 19,
  InitializeMint2 = 20,
}

/**
 * Construct a Transfer instruction
 *
 * @param source       Source account
 * @param destination  Destination account
 * @param owner        Owner of the source account
 * @param amount       Number of tokens to transfer
 * @param multiSigners Signing accounts if `owner` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */
export function createTransferInstruction(
  source: PublicKey,
  destination: PublicKey,
  owner: PublicKey,
  amount: number,
  multiSigners: Signer[] = [],
  programId = TOKEN_PROGRAM_ID,
): TransactionInstruction {
  const dataLayout = BufferLayout.struct([BufferLayout.u8('instruction'), BufferLayout.blob(8, 'amount')]);

  const keys = addSigners(
    [
      { pubkey: source, isSigner: false, isWritable: true },
      { pubkey: destination, isSigner: false, isWritable: true },
    ],
    owner,
    multiSigners,
  );

  const data = Buffer.alloc(dataLayout.span);
  dataLayout.encode(
    {
      instruction: TokenInstruction.Transfer,
      amount: new TokenAmount(amount).toBuffer(),
    },
    data,
  );

  return new TransactionInstruction({ keys, programId, data });
}

export function addSigners(keys: AccountMeta[], ownerOrAuthority: PublicKey, multiSigners: Signer[]): AccountMeta[] {
  if (multiSigners.length) {
    keys.push({ pubkey: ownerOrAuthority, isSigner: false, isWritable: false });
    // for (const signer of multiSigners) {
    multiSigners.forEach((signer) => {
      keys.push({ pubkey: signer.publicKey, isSigner: true, isWritable: false });
    });
    // keys.push({ pubkey: signer.publicKey, isSigner: true, isWritable: false });
    // }
  } else {
    keys.push({ pubkey: ownerOrAuthority, isSigner: true, isWritable: false });
  }
  return keys;
}

class TokenAmount extends BN {
  /**
   * Convert to Buffer representation
   */
  toBuffer(): Buffer {
    const a = super.toArray().reverse();
    const b = Buffer.from(a);
    if (b.length === 8) {
      return b;
    }

    if (b.length >= 8) {
      throw new Error('TokenAmount too large');
    }

    const zeroPad = Buffer.alloc(8);
    b.copy(zeroPad);
    return zeroPad;
  }

  /**
   * Construct a TokenAmount from Buffer representation
   */
  static fromBuffer(buffer: Buffer): TokenAmount {
    if (buffer.length !== 8) {
      throw new Error(`Invalid buffer length: ${buffer.length}`);
    }

    return new BN(
      [...buffer]
        .reverse()
        .map((i) => `00${i.toString(16)}`.slice(-2))
        .join(''),
      16,
    );
  }
}
