import React, { useState } from 'react';
import styled from 'styled-components';
import { fonts, weights, colors, sizes, borders } from '../../styles/Variables';
import Token from '../../images/token_ssu.svg';

export type EarnProps = {
  name?: string;
  apr?: string;
  epoch?: string;
  launch?: string;
};

const EarnList: React.FC<EarnProps> = (props) => {
  const { name, apr, epoch, launch } = props;

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
      <Epoch>{epoch}</Epoch>
      <Btn className={launch}>Launch</Btn>
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
  background: ${colors.yellow};
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;

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
