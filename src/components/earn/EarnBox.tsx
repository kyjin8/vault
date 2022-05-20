import React, { useState } from 'react';
import styled from 'styled-components';
import { fonts, weights, colors, sizes, borders } from '../../styles/Variables';
import { TokenTo } from '../style/style';
import TokenIcon from '../../images/token_sample.svg';
import { TOKENS_ARRAY, TOKENS } from '../../action/tokens';

export type EarnProps = {
  name?: string;
  closes?: string;
  apr?: string;
  timeline?: string;
};

const EarnBox: React.FC<EarnProps> = ({ name, closes, apr, timeline }) => {
  const [isRunning, setIsRunning] = useState(true);
  return (
    <EarnProduct>
      <div>
        <span className="close-time">Closes in {closes}</span>
        <div className="product-name">
          {/* <TokenTo src={TokenIcon} alt="token sample" /> */}
          <TokenTo src={TOKENS_ARRAY.find(token => token.symbol === name).picUrl ?? TokenIcon} alt="token img" />
          <strong>{name}</strong>
        </div>
      </div>
      <strong className="apr">APR {apr}%</strong>
      <div className="timeline">
        <span>Timeline</span>
        <span>{timeline}</span>
      </div>
      <button type="button" className={isRunning ? '' : 'on'}>
        {isRunning ? 'Deposit' : 'Running'}
      </button>
    </EarnProduct>
  );
};

export default EarnBox;

// Earn
const EarnProduct = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 340px;
  min-width: 320px;
  min-height: 350px;
  padding: 25px;
  margin: 20px;
  border: ${borders.gray};
  border-radius: 20px;
  text-align: left;
  font-size: ${sizes.normal};

  .product-name {
    display: flex;
    align-items: center;
  }

  strong {
    line-height: 40px;
    font-size: ${sizes.middle};
    font-weight: ${weights.bold};
  }

  span {
    line-height: 40px;
    font-weight: ${weights.bold};
  }

  button {
    width: 120px;
    height: 46px;
    margin: 0 auto;
    line-height: 46px;
    background: #ffe872;
    border-radius: 10px;
    font-size: ${sizes.normal};
    font-weight: ${weights.bold};

    :disabled {
      cursor: not-allowed;
    }

    &.on {
      background: #ebebeb;
    }

    @media all and (max-width: 979px) {
      height: 30px;
      line-height: 30px;
      font-size: 12px;
    }
  }
`;
