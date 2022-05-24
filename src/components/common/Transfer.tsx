import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
// import { useConnection, useWallet } from '@solana/wallet-adapter-react';
// import { Keypair, SystemProgram, Transaction, PublicKey } from '@solana/web3.js';
// import React, { FC, useCallback } from 'react';

// import { BtnWr, BtnType1, BtnType2 } from '../style/style';

// export const SendOneLamportToRandomAddress: FC = () => {
//   const { connection } = useConnection();
//   const { publicKey, sendTransaction } = useWallet();

//   const myPub = new PublicKey('54tQ6soXdwqg3i13NzQu6J8cKbBxfeFQWKGNcQ5CgcVx');

//   const onClick = useCallback(async () => {
//     if (!publicKey) throw new WalletNotConnectedError();

//     console.log(myPub);

//     const transaction = new Transaction().add(
//       SystemProgram.transfer({
//         fromPubkey: publicKey,
//         toPubkey: myPub,
//         lamports: 1,
//       }),
//     );

//     const signature = await sendTransaction(transaction, connection);

//     await connection.confirmTransaction(signature, 'processed');
//   }, [publicKey, sendTransaction, connection]);

//   return (
//     <>
//       <BtnType1 onClick={onClick} disabled={!publicKey}>
//         Send 1 lamport to a random address!
//       </BtnType1>
//     </>
//   );
// };
