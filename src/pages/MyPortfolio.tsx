import React, { useRef, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import styled from 'styled-components';
import { TotalListBox } from '../components/style/style';
import Status from '../components/portfolio/Status';
import { StatusWr, TotalTit, TotalTxt, Wrap, WrapBox, SubTxt, LinkTo } from '../components/style/style';
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
      <StatusWr>
        <Status />
        <TotalListBox>
          {/* 볼트에 입금한 총 자산 - 지갑 잔액으로 임시 대체 */}
          <TotalTit fontWeight="normal">My total assets</TotalTit>
          <TotalTxt>{balance || '0.00'} USD</TotalTxt>
          {/* 예치 상품에 넣은 자산 */}
        </TotalListBox>
      </StatusWr>
      <Wrap>
        <strong>Vault Status</strong>
        <>
          <SubTxt>
            When claiming your rewards, you will need to select between SSU and the respective token in which to redeem
            your rewards.
          </SubTxt>
          <LinkTo onClick={() => (window.location.href = '/')}>
            Click on the &nbsp;<span>Earn tab</span> to start!
          </LinkTo>
        </>
      </Wrap>
    </>
  );
};

export default MyPortfolio;
