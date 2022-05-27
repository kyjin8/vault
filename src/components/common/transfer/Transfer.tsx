import React, { FC, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction, PublicKey } from '@solana/web3.js';
import { Notification } from '../../../utils/notify';

import { BtnWr, BtnType1, BtnType2 } from '../../style/style';

export const SendOneLamportToRandomAddress: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const myPub = new PublicKey('54tQ6soXdwqg3i13NzQu6J8cKbBxfeFQWKGNcQ5CgcVx');

  // console.log(myPub.toString());

  const onClick = useCallback(async () => {
    if (!publicKey) return;

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: myPub,
          lamports: 1,
        }),
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

  return (
    <BtnWr>
      <BtnType1 onClick={onClick} disabled={!publicKey}>
        Send
      </BtnType1>
    </BtnWr>
  );
};

export default SendOneLamportToRandomAddress;
