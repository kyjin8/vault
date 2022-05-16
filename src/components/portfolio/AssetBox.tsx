import React, { useState } from 'react';
import { useCoinMarketCap } from '../../action/queries';
import { AssetContents } from '../style/style';
import AssetInfo from './AssetInfo';
import { BtnWr, BtnType1, BtnType2 } from '../style/style';


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

  return (
    <>
      {products.map((val: any) => {
        return (
          <AssetContents key={val}>
            <AssetInfo name={val.name} rate={val.rate} total={val.total} />
            <BtnWr>
              <BtnType1>Deposit</BtnType1>
              <BtnType2>Withdraw</BtnType2>
            </BtnWr>
          </AssetContents>
        );
      })}
    </>
  );
};

export default AssetBox;
