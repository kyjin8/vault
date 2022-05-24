import React, { useState } from 'react';
import styled from 'styled-components';

import IconClose from '../../images/popup-close.svg';
import Token from '../../images/token_ssu.svg';
import PoolsBg from '../../images/pools_bg.svg';
import { colors, sizes, weights } from '../../styles/Variables';

interface PopupProps {
  showDepositPopup: boolean;
  setDepositPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupDeposit = ({ showDepositPopup, setDepositPopup }: PopupProps) => {
  return (
    <>
      {showDepositPopup ? (
        <PopupDimmed>
          <PopupWr>
            <PopupClose
              onClick={() => {
                setDepositPopup(false);
              }}
            >
              <img src={IconClose} alt="close" />
            </PopupClose>
            <strong>Deposit</strong>
            <Contents>
              <form>
                <input type="text" placeholder="Type amount to deposit" />
                <TokenWr>
                  <img src={Token} alt="token ssu" />
                  Token
                </TokenWr>
              </form>
              <Btncode type="button">QR CODE</Btncode>
              <ul>
                <li>
                  Send only (Asset Type) to this deposit address. Sending other coins may result in the loss of your
                  crypto asset.
                </li>
                <li>Make sure to double check deposit address before depositing.</li>
              </ul>
            </Contents>
            <PoolsSubmit>
              <BtnSubmit
                onClick={() => {
                  setDepositPopup(false);
                }}
              >
                Deposit
              </BtnSubmit>
            </PoolsSubmit>
          </PopupWr>
        </PopupDimmed>
      ) : null}
    </>
  );
};

export default PopupDeposit;

const PopupDimmed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  background: rgba(108, 107, 107, 0.45);
`;

const PopupWr = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 4;
  display: flex;
  justify-content: center;
  align-content: space-between;
  flex-wrap: wrap;
  max-width: 500px;
  min-width: 320px;
  width: 100%;
  min-height: 500px;
  max-height: 645px;
  padding: 30px;
  background: url(${PoolsBg}) no-repeat top center #f5f5f5;
  background-size: contain;
  border-radius: 20px;
  border: 1px solid #cecece;
  line-height: 45px;

  @media all and (max-width: 979px) {
    width: calc(100% - 40px);
  }

  strong {
    width: 100%;
    margin: 30px 0 0 0;
    font-size: 24px;
    font-weight: 600;
    text-align: center;

    @media all and (max-width: 979px) {
      margin: 0;
      font-size: 20px;
    }
  }
`;

const PopupClose = styled.button`
  position: absolute;
  top: 25px;
  right: 25px;
  padding: 0;
`;

const Contents = styled.div`
  width: 100%;
  text-align: center;

  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    padding: 10px 15px 10px 10px;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    background: #fff;
  }

  input {
    width: calc(100% - 90px);
    height: 100%;
    border: 0;
  }

  ul {
    margin-left: 20px;
    list-style: disc;
    text-align: left;

    li {
      line-height: 20px;
    }
  }
`;

const TokenWr = styled.div`
  display: flex;
  align-items: center;
  font-weight: ${weights.bold};

  img {
    width: 20px;
    margin: 0 5px 0 0;
  }
`;

const ContentList = styled.ul`
  display: flex;
  justify-content: space-between;

  li {
    width: 50%;

    &:nth-child(even) {
      text-align: right;
      font-weight: bold;
    }
  }
`;

const PoolsSubmit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
`;

const BtnSubmit = styled.button`
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: ${colors.yellow};
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;

  @media all and (max-width: 979px) {
    height: 50px;
    line-height: 35px;
    font-size: 16px;
  }
`;

const Btncode = styled.button`
  width: 90px;
  height: 40px;
  margin: 20px auto;
  background: ${colors.yellow};
  border: solid 1px ${colors.black};
  border-radius: 5px;
  font-size: ${sizes.small};
  font-weight: ${weights.bold};
`;
