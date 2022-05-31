// needs Keypair

import { struct, u8 } from '@solana/buffer-layout';
import { bool, publicKey } from '@solana/buffer-layout-utils';
import {
  Connection,
  PublicKey,
  Transaction,
  AccountInfo,
  SystemProgram,
  Commitment,
  TransactionInstruction,
  SYSVAR_RENT_PUBKEY,
  Signer,
  sendAndConfirmTransaction,
  ConfirmOptions,
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, AccountLayout } from '@solana/spl-token';

export enum AccountType {
  Uninitialized,
  Mint,
  Account,
}
export const ACCOUNT_TYPE_SIZE = 1;

export const ACCOUNT_SIZE = AccountLayout.span;

export interface Account {
  /** Address of the account */
  address: PublicKey;
  /** Mint associated with the account */
  mint: PublicKey;
  /** Owner of the account */
  owner: PublicKey;
  /** Number of tokens the account holds */
  amount: bigint;
  /** Authority that can transfer tokens from the account */
  delegate: PublicKey | null;
  /** Number of tokens the delegate is authorized to transfer */
  delegatedAmount: bigint;
  /** True if the account is initialized */
  isInitialized: boolean;
  /** True if the account is frozen */
  isFrozen: boolean;
  /** True if the account is a native token account */
  isNative: boolean;
  /**
   * If the account is a native token account, it must be rent-exempt. The rent-exempt reserve is the amount that must
   * remain in the balance until the account is closed.
   */
  rentExemptReserve: bigint | null;
  /** Optional authority to close the account */
  closeAuthority: PublicKey | null;
  tlvData: Buffer;
}

export enum AccountState {
  Uninitialized = 0,
  Initialized = 1,
  Frozen = 2,
}

export interface Multisig {
  /** Address of the multisig */
  address: PublicKey;
  /** Number of signers required */
  m: number;
  /** Number of possible signers, corresponds to the number of `signers` that are valid */
  n: number;
  /** Is this mint initialized */
  isInitialized: boolean;
  /** Full set of signers, of which `n` are valid */
  signer1: PublicKey;
  signer2: PublicKey;
  signer3: PublicKey;
  signer4: PublicKey;
  signer5: PublicKey;
  signer6: PublicKey;
  signer7: PublicKey;
  signer8: PublicKey;
  signer9: PublicKey;
  signer10: PublicKey;
  signer11: PublicKey;
}

export type RawMultisig = Omit<Multisig, 'address'>;

export const MultisigLayout = struct<RawMultisig>([
  u8('m'),
  u8('n'),
  bool('isInitialized'),
  publicKey('signer1'),
  publicKey('signer2'),
  publicKey('signer3'),
  publicKey('signer4'),
  publicKey('signer5'),
  publicKey('signer6'),
  publicKey('signer7'),
  publicKey('signer8'),
  publicKey('signer9'),
  publicKey('signer10'),
  publicKey('signer11'),
]);

export const MULTISIG_SIZE = MultisigLayout.span;

export async function getAccount(
  connection: Connection,
  address: PublicKey,
  commitment?: Commitment,
  programId = TOKEN_PROGRAM_ID,
): Promise<Account> {
  const info = await connection.getAccountInfo(address, commitment);
  return unpackAccount(info, address, programId);
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

export async function getOrCreateAssociatedTokenAccount(
  connection: Connection,
  payer: Signer,
  mint: PublicKey,
  owner: PublicKey,
  allowOwnerOffCurve = false,
  commitment?: Commitment,
  confirmOptions?: ConfirmOptions,
  programId = TOKEN_PROGRAM_ID,
  associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID,
): Promise<Account> {
  const associatedToken = await getAssociatedTokenAddress(
    mint,
    owner,
    allowOwnerOffCurve,
    programId,
    associatedTokenProgramId,
  );

  // This is the optimal logic, considering TX fee, client-side computation, RPC roundtrips and guaranteed idempotent.
  // Sadly we can't do this atomically.
  let account: Account;
  try {
    account = await getAccount(connection, associatedToken, commitment, programId);
  } catch (error: any) {
    // TokenAccountNotFoundError can be possible if the associated address has already received some lamports,
    // becoming a system account. Assuming program derived addressing is safe, this is the only case for the
    // TokenInvalidAccountOwnerError in this code path.
    if (error.message === 'TokenAccountNotFoundError' || error.message === 'TokenInvalidAccountOwnerError') {
      // As this isn't atomic, it's possible others can create associated accounts meanwhile.
      try {
        const transaction = new Transaction().add(
          createAssociatedTokenAccountInstruction(
            payer.publicKey,
            associatedToken,
            owner,
            mint,
            programId,
            associatedTokenProgramId,
          ),
        );

        await sendAndConfirmTransaction(connection, transaction, [payer], confirmOptions);
      } catch (error: unknown) {
        // Ignore all errors; for now there is no API-compatible way to selectively ignore the expected
        // instruction error if the associated account exists already.
      }

      // Now this should always succeed
      account = await getAccount(connection, associatedToken, commitment, programId);
    } else {
      throw error;
    }
  }

  if (!account.mint.equals(mint)) throw Error('TokenInvalidMintError');
  if (!account.owner.equals(owner)) throw new Error('TokenInvalidOwnerError');

  //   if (!account.mint.equals(mint.toBuffer())) throw Error('TokenInvalidMintError');
  //   if (!account.owner.equals(owner.toBuffer())) throw new Error('TokenInvalidOwnerError');

  return account;
}

function unpackAccount(info: AccountInfo<Buffer> | null, address: PublicKey, programId: PublicKey) {
  if (!info) throw new Error('TokenAccountNotFoundError');
  if (!info.owner.equals(programId)) throw new Error('TokenInvalidAccountOwnerError');
  if (info.data.length < ACCOUNT_SIZE) throw new Error('TokenInvalidAccountSizeError');

  const rawAccount = AccountLayout.decode(info.data.slice(0, ACCOUNT_SIZE));
  let tlvData = Buffer.alloc(0);
  if (info.data.length > ACCOUNT_SIZE) {
    if (info.data.length === MULTISIG_SIZE) throw new Error('TokenInvalidAccountSizeError');
    if (info.data[ACCOUNT_SIZE] !== AccountType.Account) throw new Error('TokenInvalidAccountError');
    tlvData = info.data.slice(ACCOUNT_SIZE + ACCOUNT_TYPE_SIZE);
  }

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
    tlvData,
  };
}
