import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction, PublicKey } from '@solana/web3.js';
import { toast } from 'react-toastify';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Notification } from '../../../utils/notify';
import { getOrCreateAssociatedTokenAccount, createTransferInstruction } from '../../../action/RequestWeb3';

import { weights, colors } from '../../../styles/Variables';

interface SendProps {
  toPublicKey: string;
  amount: number;
}

// Docs: https://github.com/solana-labs/solana-program-library/pull/2539/files
// https://github.com/solana-labs/wallet-adapter/issues/189
// repo: https://github.com/solana-labs/example-token/blob/v1.1/src/client/token.js
// creating a token for testing: https://learn.figment.io/tutorials/sol-mint-token
const SendTransaction: React.FC<SendProps> = ({ toPublicKey, amount }) => {
  const { connection } = useConnection();
  const { publicKey, signTransaction, sendTransaction } = useWallet();

  console.log('transfer 들어옴');

  const onSendSPLTransaction = useCallback(
    async (toPubkey: string, amount: number) => {
      if (!toPubkey || !amount) return;

      try {
        if (!publicKey || !signTransaction) return;
        const toPublicKey = new PublicKey(toPubkey);
        const mint = new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB');

        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          publicKey,
          mint,
          publicKey,
          signTransaction,
        );

        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          publicKey,
          mint,
          toPublicKey,
          signTransaction,
        );

        const transaction = new Transaction().add(
          createTransferInstruction(
            fromTokenAccount.address, // source
            toTokenAccount.address, // dest
            publicKey,
            amount * 10 ** 6,
            [],
            TOKEN_PROGRAM_ID,
          ),
        );

        const signature = await sendTransaction(transaction, connection);
        toast.info(Notification({ msg: 'Transaction Sent', signature }));

        const res = await connection.confirmTransaction(signature, 'confirmed');
        // console.log('Transfer response', res); // context(slot: 12315), value(err:null)

        if (!res.value.err) {
          toast.success(Notification({ msg: `Transaction confirmed`, signature }));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e) {
        if (e instanceof Error) {
          toast.error(e?.message);
          console.log('sendTransaction error');
        }
      }
    },
    [publicKey, sendTransaction, connection],
  );

  return (
    <>
      <Btn
        onClick={() => {
          onSendSPLTransaction(toPublicKey, amount);
        }}
      >
        Launch
      </Btn>
    </>
  );
};

export default SendTransaction;

const Btn = styled.button`
  width: 340px;
  height: 50px;
  padding: 10px 22px;
  margin: 20px 0 0 0;
  background: ${colors.yellow};
  border-radius: 10px;
  font-size: 16px;
  font-weight: ${weights.bold};
  color: ${colors.black};
  text-decoration: none;
`;
