import React, { useState } from 'react';
import { useCoinMarketCap } from '../../action/queries';
import { AssetContents } from '../style/style';
import AssetInfo from './AssetInfo';
import { BtnWr, BtnType1, BtnType2 } from '../style/style';
import PopupDeposit from '../popups/PopupDeposit';
import PopupWithdraw from '../popups/PopupWithdraw';

const AssetBox = () => {
  const coinPrice = useCoinMarketCap();

  const products = [
    {
      name: 'WBTC',
      rate: `1 wBTC ≈ ${coinPrice.data?.btcPrice} USD`,
      total: '100.000',
    },
    {
      name: 'WBTC',
      rate: `1 wBTC ≈ ${coinPrice.data?.ethPrice} USD`,
      total: '100.000',
    },
  ];

  const [showDepositPopup, setDepositPopup] = useState(false);
  const [showWithdrawPopup, setWithdrawPopup] = useState(false);

  return (
    <>
      {products.map((val: any) => {
        return (
          <>
            <AssetContents>
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
