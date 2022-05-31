import React, { useState } from 'react';
import styled from 'styled-components';
import { products, ProductInfo } from '../../action/products';
import Token from '../../images/token_ssu.svg';
import { weights, borders } from '../../styles/Variables';
import { TotalBox, TotalTxt } from '../style/style';

import TimeLine from '../common/Timeline';
import PopupClaim from '../popups/PopupClaim';

export type ItemsProps = {
  isClaim: boolean;
  setIsClaim: React.Dispatch<React.SetStateAction<boolean>>;
};

const Items: React.FC<ItemsProps> = (props) => {
  const { isClaim, setIsClaim } = props;
  const [showClaimPopup, setClaimPopup] = useState(false);
  return (
    <>
      {products.map((product: ProductInfo) => {
        return (
          <Wrap>
            <Tit>
              <TokenWr>
                <img src={Token} alt="token ssu" />
                <TokenName>{product.prdNm}</TokenName>
              </TokenWr>
              <TotalBox margin="10px 0">
                <TotalTxt fontWeight="bold" textAlign="flex-start">
                  Lock up amount
                </TotalTxt>
                <TotalTxt fontWeight="bold" textAlign="flex-end">
                  000.000 COIN
                </TotalTxt>
              </TotalBox>
            </Tit>
            <Contents>
              <TimeLine operStart={product.operationStartEpoch} operEnd={product.operationEndEpoch} />
              <p className="note">
                Note: You will receive 100% of your rewards in the asset type you select for this vault.
              </p>
              <ClameWr>
                <Box>
                  <p>Estimated SSU Rewards</p>
                  <p className="amount">0.000 SSU</p>
                </Box>
                {isClaim ? (
                  <Btn
                    bg="#ffe872"
                    onClick={() => {
                      setClaimPopup(true);
                    }}
                  >
                    Claim SSU
                  </Btn>
                ) : (
                  <BtnWr>
                    <Btn bg="#c6c6c6">Claim SSU</Btn>
                    <div className="hover">There is still some time left! Rewards cannot be claimed just yet.</div>
                  </BtnWr>
                )}
              </ClameWr>
              <ClameWr>
                <Box>
                  <p>Estimated TOKEN Rewards</p>
                  <p className="amount">0.000 TOKEN</p>
                </Box>
                {isClaim ? (
                  <Btn bg="#ffe872">Claim BTC</Btn>
                ) : (
                  <BtnWr>
                    <Btn bg="#c6c6c6">Claim BTC</Btn>
                    <div className="hover">There is still some time left! Rewards cannot be claimed just yet.</div>
                  </BtnWr>
                )}
              </ClameWr>
            </Contents>
            <PopupClaim showClaimPopup={showClaimPopup} setClaimPopup={setClaimPopup} />
          </Wrap>
        );
      })}
    </>
  );
};

export default Items;

const Wrap = styled.li`
  display: inline-block;
  max-width: 350px;
  margin: 10px;
  border: ${borders.gray};
  border-radius: 20px;

  @media all and (max-width: 979px) {
    max-width: none;
  }
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
  margin: 0 0 0 10px;
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
  font-size: 12px;

  .note {
    margin: 30px 0 20px 0;

    @media all and (max-width: 979px) {
      text-align: left;
    }
  }
`;

const ClameWr = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Box = styled.div`
  margin: 5px 0;

  .amount {
    font-weight: bold;

    @media all and (max-width: 979px) {
      text-align: left;
    }
  }
`;

const BtnWr = styled.div`
  position: relative;

  &:hover {
    .hover {
      display: block;
      cursor: default;
    }
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
  }
`;
const Hover = styled.div``;

const Btn = styled.button<{ bg: any }>`
  width: 90px;
  height: 38px;
  line-height: 38px;
  background: ${(props) => props.bg};
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;

  :disabled {
    cursor: not-allowed;
  }

  &.claim {
    background: #c6c6c6;
    background: #ffe872;
  }

  @media all and (max-width: 979px) {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
  }
`;
