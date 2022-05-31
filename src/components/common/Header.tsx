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
      <BtnWr>
        <MySSU>
          <img src={Token} alt="token ssu" />${intlNumberFormat3(solfarmPoolInfo?.data?.['SSU-USDC'].price ?? 0)}
        </MySSU>
        <WalletMultiButton />
      </BtnWr>
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

  @media all and (max-width: 979px) {
    position: relative;
    height: 80px;
  }
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

  @media all and (max-width: 979px) {
    position: absolute;
    top: 0;
    left: 0;
  }

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

const BtnWr = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .wallet-adapter-button-trigger {
    width: auto;
    height: 30px;
    background: #ffe872;
    border: 1px solid #cecece;
    border-radius: 10px;
    color: #3e3a3a;
    font-size: 12px;
    font-weight: 600;
    line-height: 30px;

    &:hover {
      background: #000;
      color: #fff;
      transition: all 0.3s ease-in;
    }
    .wallet-adapter-button-start-icon {
      display: none;
    }

    @media all and (max-width: 979px) {
      justify-content: center !important;
      position: absolute;
      bottom: 15px;
      left: 0;
      width: calc(100% - 90px);
    }
  }

  .wallet-adapter-dropdown {
    @media all and (max-width: 979px) {
      position: initial;
    }
  }
`;

const MySSU = styled.div`
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
