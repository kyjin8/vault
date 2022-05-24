import React, { useRef, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Status from '../components/portfolio/Status';
import Items from '../components/portfolio/Items';
import { StatusWr, TotalListBox, TotalTxt, Wrap, WrapBox, SubTxt, LinkTo } from '../components/style/style';
import { intlNumberFormat4 } from '../utils/utils';
import { useBalance } from '../utils/balance';

// interface MyProps {
//   showItems: boolean;
//   setItems: React.Dispatch<React.SetStateAction<boolean>>;
// }

const MyPortfolio = () => {
  const { publicKey } = useWallet();
  const [balance] = useBalance();

  const walletAddress = () => {
    if (!publicKey) return '';
    const address = publicKey?.toBase58() || '';
    return `(${address.slice(0, 4)}...${address.slice(-6)})`;
  };
  const [isItem, setIsItem] = useState(true);
  return (
    <>
      <StatusWr>
        <Status />
        <TotalListBox>
          {/* 볼트에 입금한 총 자산 - 지갑 잔액으로 임시 대체 */}
          <TotalTxt fontWeight="normal" textAlign="flex-start">
            My total assets
          </TotalTxt>
          <TotalTxt fontWeight="normal" textAlign="flex-end">
            {balance || '0.00'} USD
          </TotalTxt>
          {/* 예치 상품에 넣은 자산 */}
        </TotalListBox>
      </StatusWr>
      <Wrap>
        <strong>Vault Status</strong>
        <>
          <SubTxt>
            When claiming your rewards, you will need to select between SSU and the respective token in which to redeem
            your rewards.
          </SubTxt>
          {isItem ? (
            <ul>
              <Items />
            </ul>
          ) : (
            <LinkTo
              onClick={() => {
                window.location.href = '/';
              }}
            >
              Click on the &nbsp;<span>Earn tab</span> to start!
            </LinkTo>
          )}
        </>
      </Wrap>
    </>
  );
};

export default MyPortfolio;
