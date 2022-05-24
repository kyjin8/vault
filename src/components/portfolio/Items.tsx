import React from 'react';
import styled from 'styled-components';
import Token from '../../images/token_ssu.svg';
import { fonts, weights, colors, sizes, borders } from '../../styles/Variables';
import { TotalBox, TotalTxt } from '../style/style';

import TimeLine from '../common/Timeline';

export type ItemProps = {
  name?: string;
};

const Items: React.FC<ItemProps> = (props) => {
  const { name } = props;
  return (
    <Wrap>
      <Tit>
        <TokenWr>
          <img src={Token} alt="token ssu" />
          <TokenName>{name}</TokenName>
        </TokenWr>
        <TotalBox>
          <TotalTxt fontWeight="bold" textAlign="flex-start">
            Lock up amount
          </TotalTxt>
          <TotalTxt fontWeight="bold" textAlign="flex-end">
            000.000 COIN
          </TotalTxt>
        </TotalBox>
      </Tit>
      <Contents>
        <TimeLine operStart={2} operEnd={3} />
      </Contents>
    </Wrap>
  );
};

export default Items;

const Wrap = styled.li`
  overflow: hidden;
  max-width: 380px;
  border: ${borders.gray};
  border-radius: 20px;
`;

const TokenWr = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
  }
`;

const TokenName = styled.span`
  margin: 0 0 0 15px;
  font-weight: ${weights.bold};
`;

const Tit = styled.div`
  position: relative;
  top: 0px;
  left: 0px;
  width: 100%;
  padding: 20px 20px 30px;
  background: rgb(255, 232, 114);
  border-radius: 20px 20px 0px 0px;
  text-align: left;
`;

const Contents = styled.div`
  position: relative;
  top: -20px;
  left: 0;
  width: 100%;
  padding: 20px 20px 0;
  background: #fff;
  border-radius: 20px;
`;
