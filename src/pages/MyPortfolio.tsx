import React, { useRef, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import styled from 'styled-components';
import { TotalListBox } from '../components/style/style';

import Status from '../components/portfolio/Status';
import { TotalBox, TotalTit, TotalTxt } from '../components/style/style';
import AssetBox from '../components/portfolio/AssetBox';
import VaultStatus from '../components/portfolio/VaultStatus';
import { intlNumberFormat4 } from '../utils/utils';
import { useBalance } from '../utils/balance';

const MyPortfolio = () => {
  const { publicKey } = useWallet();
  const [balance] = useBalance();

  const walletAddress = () => {
    if (!publicKey) return '';
    const address = publicKey?.toBase58() || '';
    return `(${address.slice(0, 4)}...${address.slice(-6)})`;
  };

  return (
    <>
      <Status />
      <TotalListBox>
        {/* 볼트에 입금한 총 자산 - 지갑 잔액으로 임시 대체 */}
        <TotalTit>My Assets</TotalTit>
        <TotalTxt>{balance || "0.00"} USD</TotalTxt>
        {/* 예치 상품에 넣은 자산 */}
        <TotalTit>Lock Up Amount</TotalTit>
        <TotalTxt>0.00 USD</TotalTxt>
      </TotalListBox>
      <AssetBox />
      <VaultStatus />
    </>
  );
};

export default MyPortfolio;