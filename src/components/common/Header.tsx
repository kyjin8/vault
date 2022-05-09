import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import { fonts, weights, colors, sizes } from '../../styles/Variables';

import Token from '../../images/token_ssu.svg';
import { intlNumberFormat3 } from '../../utils/utils';
import { useSolfarm } from '../../action/queries';

const Header = () => {
  const network = WalletAdapterNetwork.Mainnet;

  const solfarmPoolInfo = useSolfarm();

  return (
    <Wrap>
      <Logo>
        <img src={Token} alt="token ssu" />
        <HomeLink to="/">Sunny Side Up</HomeLink>
      </Logo>
      <MySSU>
        <img src={Token} alt="token ssu" />${intlNumberFormat3(solfarmPoolInfo?.data?.['SSU-USDC'].price ?? 0)}
      </MySSU>
      <WalletMultiButton />
    </Wrap>
  );
};

export default Header;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1182px;
  width: 100%;
  height: 50px;
  margin: 0 auto;
`;

const Logo = styled.h1`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 600;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    margin: 0 5px 0 0;
    vertical-align: middle;
  }
`;

const HomeLink = styled(Link)`
  color: #3a3a3a;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    color: #3a3a3a;
    text-decoration: none;
  }
`;

export const MySSU = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 30px;
  margin: 0 5px 0 0;
  padding: 0 8px;
  border: 1px solid #cecece;
  border-radius: 10px;
  font-size: 12px;
  line-height: 30px;

  img {
    width: 20px;
    height: 20px;
    margin: 0 5px 0 0;
  }

  @media all and (max-width: 979px) {
    position: absolute;
    bottom: 15px;
    right: 0px;
    margin: 0;
  }
`;
