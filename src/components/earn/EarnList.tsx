import React, { useState } from 'react';
import styled from 'styled-components';
import { fonts, weights, colors, sizes, borders } from '../../styles/Variables';
import Token from '../../images/token_ssu.svg';
import IconInfo from '../../images/info.svg';
import PopupLaunch from '../popups/PopupLaunch';

export type EarnProps = {
  name?: string;
  apr?: string;
  time: string;
  epoch?: string;
  launch?: string;
};

const EarnList: React.FC<EarnProps> = (props) => {
  const { name, apr, time, epoch, launch } = props;
  const [showLaunchPopup, setLaunchPopup] = useState(false);

  return (
    <Wrap className={launch}>
      <TokenWr>
        <img src={Token} alt="token ssu" />
        <TokenName>{name}</TokenName>
      </TokenWr>
      <Apr>
        <span>APR </span>
        <span>{apr}</span>
      </Apr>
      <Epoch>
        <p className="box">
          closes in: {time}
          <HoverBox>
            <img src={IconInfo} alt="info" />
            <p className="hover">After the vault closes, you will not be able to deposit into it.</p>
          </HoverBox>
        </p>
        <p className="box">
          Timeline: {epoch}
          <HoverBox>
            <img src={IconInfo} alt="info" />
            <p className="hover">After the vault closes, you will not be able to deposit into it.</p>
          </HoverBox>
        </p>
      </Epoch>
      <Btn
        className={launch}
        onClick={() => {
          setLaunchPopup(true);
        }}
      >
        Launch
      </Btn>
      {showLaunchPopup ? <PopupLaunch showLaunchPopup={showLaunchPopup} setLaunchPopup={setLaunchPopup} /> : null}
    </Wrap>
  );
};

export default EarnList;

const Wrap = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 35px 25px;
  margin: 15px 0;
  border: ${borders.gray};
  border-radius: 20px;
  font-size: 18px;

  @media all and (max-width: 979px) {
    flex-wrap: wrap;
    padding: 20px;
    font-size: 16px;
  }
`;

const TokenWr = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 40px;
    height: 40px;

    @media all and (max-width: 979px) {
      width: 24px;
      height: 24px;
    }
  }
`;

const TokenName = styled.span`
  margin: 0 0 0 15px;
  font-weight: ${weights.bold};

  @media all and (max-width: 979px) {
    margin: 0 0 0 8px;
  }
`;

const Apr = styled.div`
  font-weight: ${weights.bold};
`;

const Epoch = styled.div`
  font-size: ${sizes.normal};
  font-weight: ${weights.normal};

  @media all and (max-width: 979px) {
    margin: 15px 0;
  }

  .box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const HoverBox = styled.div`
  position: relative;

  img {
    position: relative;
    top: 1px;
    margin: 0 0 0 5px;
    cursor: pointer;
  }

  .hover {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    display: none;
    min-width: 260px;
    padding: 10px 20px;
    background: #e6e3e3;
    border-radius: 10px;
    cursor: default;
  }

  &:hover {
    .hover {
      display: block;
    }
  }
`;

const Btn = styled.button`
  width: 90px;
  height: 38px;
  line-height: 38px;
  background: ${colors.yellow};
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;

  @media all and (max-width: 979px) {
    width: 100%;
  }

  &.closed {
    background: #c4c4c4;
  }

  :disabled {
    cursor: not-allowed;
  }

  @media all and (max-width: 979px) {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
  }
`;
