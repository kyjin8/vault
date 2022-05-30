import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PublicKey } from '@solana/web3.js';
import styled from 'styled-components';
import IconClose from '../../images/popup-close.svg';
import { useBalance, useTokenAccounts } from '../../utils/balance';
import { TokenInfo, TOKENS } from '../../action/tokens';
import Transfer from '../common/transfer/SendTransaction';

import { fonts, weights, colors, sizes } from '../../styles/Variables';

interface LaunchProps {
  showLaunchPopup: boolean;
  setLaunchPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const Send = (toPublicKey: string, amount: number) => {
  return null;
};

const SelectTokenList = ['SSU', 'BTC', 'ETH', 'USDC', 'USDT'].map((val) => ({
  value: val,
}));

const PopupLaunch = ({ showLaunchPopup, setLaunchPopup }: LaunchProps) => {
  const myPub = '54tQ6soXdwqg3i13NzQu6J8cKbBxfeFQWKGNcQ5CgcVx';

  const [tokenAccounts] = useTokenAccounts();
  const [fromToken, setFromToken] = useState('');

  const getTokenInfo = (token: { value: string } | null) => {
    if (!token || !token.value) return null;
    return TOKENS?.[token.value] ?? null;
  };

  console.log(tokenAccounts);
  console.log('토큰', fromToken);

  // useEffect(() => {
  //   async function update() {
  //     const fromTokenInfo = await getTokenInfo(fromToken);
  //     console.log('토큰 정보', fromTokenInfo);
  //   }
  //   setFromToken(SelectTokenList[0]);
  // }, []);

  return (
    <>
      {showLaunchPopup ? (
        <>
          <Dimmed />
          <Wrap>
            <PopupClose
              onClick={() => {
                setLaunchPopup(false);
              }}
            >
              <img src={IconClose} alt="close" />
            </PopupClose>
            <Tit>Invest</Tit>
            <ListWr>
              <strong>Summary</strong>
              <List>
                <li>Asset</li>
                <li>TOKEN NAME</li>
                <li>Duration</li>
                <li>3XX-3XX Epoch</li>
                <li>APR</li>
                <li>000.00%</li>
              </List>
            </ListWr>
            <ListWr>
              <strong>Deposit from your wallet</strong>
              <List>
                <li>Balance</li>
                <li>000.000</li>
                {/* <li>
                  {tokenAccounts
                    ?.find((val) => val.mintAddress === getTokenInfo(fromToken)?.mintAddress)
                    ?.balance?.fixed() || 0}
                </li> */}
              </List>
              <form>
                <input type="text" placeholder="Type amount to deposit" />
                <div>
                  <button type="button">HALF</button>
                  <button type="button">MAX</button>
                </div>
              </form>
            </ListWr>
            <Txt>USD $$$</Txt>
            <Transfer toPublicKey={myPub} amount={0.01} />
            <Btn>Launch</Btn>
          </Wrap>
        </>
      ) : null}
    </>
  );
};

export default PopupLaunch;

const Dimmed = styled.div`
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
`;

const Wrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  max-width: 550px;
  min-width: 300px;
  width: calc(100vw - 40px);
  padding: 40px 30px 20px 30px;
  border-radius: 10px;
  background: #f5f5f5;
  border: 1px solid #cecece;
  box-shadow: rgb(0 0 0 / 8%) 0px 6px 32px;
  text-align: center;
  font-size: 14px;
`;

const PopupClose = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 0;
`;

const Tit = styled.strong`
  font-weight: ${weights.bold};
  font-size: 20px;
`;

const Txt = styled.p`
  margin: 15px 0;
  line-height: 18px;
  text-align: left;
`;

const ListWr = styled.div`
  width: 100%;
  margin: 30px 0 0 0;

  strong {
    display: block;
    margin: 10px 0;
    font-size: ${sizes.normal};
    font-weight: ${weights.bold};
    text-align: left;
  }

  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 5px 0;
    background: #fff;
    border-radius: 5px;

    input {
      width: calc(100% - 120px);
      padding: 10px;
      border: 0;
      border-radius: 5px;
      background: #fff;
    }

    button {
      background: ${colors.yellow};
      border-radius: 5px;
      padding: 8px 10px;
      font-weight: ${weights.bold};

      &:nth-child(2) {
        margin: 0 5px;
      }
    }
  }
`;

const List = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  li {
    &:nth-child(odd) {
      width: 30%;
      margin: 3px 0;
      text-align: left;
    }
    &:nth-child(even) {
      width: 70%;
      text-align: right;
    }
  }
`;

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
