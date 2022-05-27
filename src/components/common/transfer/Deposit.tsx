import React, { FC, useCallback } from 'react';
import BN from 'bn.js';
import { toast } from 'react-toastify';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import BigNumber from 'bignumber.js';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import {
  Connection,
  PublicKey,
  Transaction,
  LAMPORTS_PER_SOL,
  AccountInfo,
  Keypair,
  SystemProgram,
  Signer,
} from '@solana/web3.js';
import { Notification } from '../../../utils/notify';

import { useTokenAccounts } from '../../../utils/balance';
import { TOKENS } from '../../../action/tokens';
import { createAssociatedTokenAccountIfNotExist } from '../../../action/RequestWeb3';

import { BtnWr, BtnType1, BtnType2 } from '../../style/style';

interface AmountProps {
  amount: number;
}

// interface Props {
//   children: (sendTransaction: OnSendTransaction) => React.ReactNode;
// }

// type OnSendTransaction = (toPublicKey: string, amount: number) => void;

// Docs: https://github.com/solana-labs/solana-program-library/pull/2539/files
// https://github.com/solana-labs/wallet-adapter/issues/189
// repo: https://github.com/solana-labs/example-token/blob/v1.1/src/client/token.js
// creating a token for testing: https://learn.figment.io/tutorials/sol-mint-token
// const SendTransaction: React.FC<Props> = ({ children }) => {
const SendTransaction = () => {
  const { connection } = useConnection();
  const { publicKey, signTransaction, sendTransaction } = useWallet();

  const myPub = new PublicKey('54tQ6soXdwqg3i13NzQu6J8cKbBxfeFQWKGNcQ5CgcVx');

  const onSendSPLTransaction = useCallback(async () => {
    const amount = 0.001;
    if (!publicKey || !amount) return;
    // const signers: Keypair[] = [];
    const signers: Signer[] = [];

    try {
      if (!publicKey || !signTransaction) return;
      const mint = '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'; // 보낼 토큰 mint address

      const transaction = new Transaction();

      const fromTokenAccount = await createAssociatedTokenAccountIfNotExist(null, publicKey, mint, transaction);

      const toTokenAccount = await createAssociatedTokenAccountIfNotExist(null, myPub, mint, transaction);

      // const transaction = new Transaction().add(
      transaction.add(
        Token.createTransferInstruction(
          TOKEN_PROGRAM_ID,
          fromTokenAccount, // source
          toTokenAccount, // dest
          publicKey,
          signers,
          amount * LAMPORTS_PER_SOL,
        ),
      );

      const signature = await sendTransaction(transaction, connection);
      toast.info(Notification({ msg: 'Transaction Sent', signature }));

      const res = await connection.confirmTransaction(signature, 'confirmed');

      if (!res.value.err) {
        toast.success(Notification({ msg: `Transaction confirmed`, signature }));
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e?.message);
      }
    }
  }, [publicKey, sendTransaction, connection]);

  // return <>{children(onSendSPLTransaction)}</>;
  return (
    <BtnWr>
      <BtnType1 onClick={onSendSPLTransaction} disabled={!publicKey}>
        SPL
      </BtnType1>
    </BtnWr>
  );
};

export default SendTransaction;
