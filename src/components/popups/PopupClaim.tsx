import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import IconBack from '../../images/back.svg';

import { weights, colors, sizes } from '../../styles/Variables';

interface WarningProps {
  showClaimPopup: boolean;
  setClaimPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupClaim = ({ showClaimPopup, setClaimPopup }: WarningProps) => {
  return (
    <>
      {showClaimPopup ? (
        <>
          <Dimmed />
          <Wrap>
            <PopupClose
              onClick={() => {
                setClaimPopup(false);
              }}
            >
              <img src={IconBack} alt="go back" />
              <span>Go back</span>
            </PopupClose>

            <Txt margin="10px 0 15px 0" fontWeight="bold">
              Confirm the asset type in which you would like to claim your crypto rewards.
            </Txt>
            <Txt margin="10px 0 0 0" fontWeight="normal">
              Redeemable SSU Rewards
            </Txt>
            <Txt margin="5px 0 15px 0" fontWeight="bold">
              0.000 SSU
            </Txt>
            <Btn>Claim SSU</Btn>
            <SubTxt>Claim BTC instead</SubTxt>
          </Wrap>
        </>
      ) : null}
    </>
  );
};

export default PopupClaim;

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
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  max-width: 450px;
  min-width: 300px;
  width: calc(100vw - 40px);
  padding: 50px 30px 20px 30px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #cecece;
  box-shadow: rgb(0 0 0 / 8%) 0px 6px 32px;
`;

const PopupClose = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  left: 20px;
  top: 20px;

  img {
    margin: 0 5px 0 0;
  }
`;

const Txt = styled.div<{ margin: any; fontWeight: any }>`
  line-height: 18px;
  margin: ${(props) => props.margin};
  font-weight: ${(props) => props.fontWeight};
  text-align: center;
`;

const Bottoms = styled.div`
  display: flex;
  justify-content: center;
  font-size: ${sizes.small};
`;

const Btn = styled.button`
  max-width: 130px;
  height: 40px;
  padding: 10px 22px;
  background: ${colors.yellow};
  border-radius: 10px;
  font-size: ${sizes.normal};
  font-weight: ${weights.bold};
  color: ${colors.black};
  text-decoration: none;
`;

const SubTxt = styled.button`
  margin: 30px 0 0 0;
  font-size: ${sizes.small};
  text-decoration: underline;
`;
