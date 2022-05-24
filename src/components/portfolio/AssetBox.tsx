import React, { useState, FC, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction, PublicKey } from '@solana/web3.js';
import { useCoinMarketCap } from '../../action/queries';
import { AssetContents } from '../style/style';
import AssetInfo from './AssetInfo';
import { BtnWr, BtnType1, BtnType2 } from '../style/style';
import PopupDeposit from '../popups/PopupDeposit';
import PopupWithdraw from '../popups/PopupWithdraw';

const AssetBox = () => {
  const coinPrice = useCoinMarketCap();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const myPub = new PublicKey('54tQ6soXdwqg3i13NzQu6J8cKbBxfeFQWKGNcQ5CgcVx');

  const onClick = useCallback(async () => {
    if (!publicKey) return;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        // toPubkey: Keypair.generate().publicKey,
        toPubkey: myPub,
        lamports: 1000000,
      }),
    );

    const signature = await sendTransaction(transaction, connection);

    await connection.confirmTransaction(signature, 'processed');
  }, [publicKey, sendTransaction, connection]);

  const assets = [
    {
      name: 'BTC',
      rate: `1 BTC ≈ ${coinPrice.data?.btcPrice} USD`,
      total: '100.000',
    },
    {
      name: 'ETH',
      rate: `1 ETH ≈ ${coinPrice.data?.ethPrice} USD`,
      total: '100.000',
    },
    {
      name: 'USDT',
      rate: `1 USDC ≈ ${coinPrice.data?.ethPrice} USD`,
      total: '100.000',
    },
    {
      name: 'USDC',
      rate: `1 USDT ≈ ${coinPrice.data?.ethPrice} USD`,
      total: '100.000',
    },
  ];

  const [showDepositPopup, setDepositPopup] = useState(false);
  const [showWithdrawPopup, setWithdrawPopup] = useState(false);

  return (
    <>
      {assets.map((val: any) => {
        return (
          <>
            <AssetContents key={val.name}>
              <AssetInfo name={val.name} rate={val.rate} total={val.total} />
              <BtnWr>
                <BtnType1
                  onClick={() => {
                    setDepositPopup(true);
                  }}
                >
                  Deposit
                </BtnType1>
                <BtnType2
                  onClick={() => {
                    setWithdrawPopup(true);
                  }}
                >
                  Withdraw
                </BtnType2>
                <BtnType1 onClick={onClick} disabled={!publicKey}>
                  Send
                </BtnType1>
              </BtnWr>
            </AssetContents>
            <PopupDeposit showDepositPopup={showDepositPopup} setDepositPopup={setDepositPopup} />
            <PopupWithdraw showWithdrawPopup={showWithdrawPopup} setWithdrawPopup={setWithdrawPopup} />
          </>
        );
      })}
    </>
  );
};

export default AssetBox;
