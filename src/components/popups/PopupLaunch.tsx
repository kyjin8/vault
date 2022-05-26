import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import IconClose from '../../images/popup-close.svg';

import { fonts, weights, colors, sizes } from '../../styles/Variables';

interface LaunchProps {
  showLaunchPopup: boolean;
  setLaunchPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupLaunch = ({ showLaunchPopup, setLaunchPopup }: LaunchProps) => {
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
            <strong>Summary</strong>
            <ul>
              <li>Asset</li>
              <li>TOKEN NAME</li>
              <li>Duration</li>
              <li>3XX-3XX Epoch</li>
              <li>APR</li>
              <li>000.00%</li>
            </ul>
            <Txt>
              Before you need to start, you need to verify your account. <br />
              Click below to start the process.
            </Txt>
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
  max-width: 450px;
  min-width: 300px;
  width: calc(100vw - 40px);
  padding: 40px 30px 20px 30px;
  border-radius: 10px;
  background: #f5f5f5;
  border: 1px solid #cecece;
  box-shadow: rgb(0 0 0 / 8%) 0px 6px 32px;
  text-align: center;
`;

const PopupClose = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 0;
`;

const Tit = styled.strong`
  font-weight: ${weights.bold};
  font-size: ${sizes.small};
  text-align: center;
`;

const Txt = styled.p`
  margin: 15px 0;
  line-height: 18px;
  font-size: ${sizes.small};
  text-align: left;
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
