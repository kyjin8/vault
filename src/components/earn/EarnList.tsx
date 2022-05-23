import React, { useState } from 'react';
import styled from 'styled-components';
import { fonts, weights, colors, sizes, borders } from '../../styles/Variables';
import Token from '../../images/token_ssu.svg';

export type EarnProps = {
  name?: string;
  apr?: string;
  epoch?: string;
  setIsLaunch?: boolean;
};

const EarnList: React.FC<EarnProps> = (props) => {
  const { name, apr, epoch, setIsLaunch } = props;

  return (
    <Wrap>
      <TokenWr>
        <img src={Token} alt="token ssu" />
        <TokenName>{name}</TokenName>
      </TokenWr>
      <Apr>
        <span>APR </span>
        <span>{apr}</span>
      </Apr>
      <Epoch>{epoch}</Epoch>
      <Btn className={{ setIsLaunch } ? 'on' : ''}>Launch</Btn>
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
`;

const TokenWr = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
  }
`;

const TokenName = styled.span`
  margin: 0 0 0 15px;
  font-weight: ${weights.bold};
`;

const Apr = styled.div`
  font-weight: ${weights.bold};
`;

const Epoch = styled.div``;

const Btn = styled.button`
  width: 90px;
  height: 38px;
  line-height: 38px;
  background: #c4c4c4;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;

  &.on {
    background: ${colors.yellow};
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
