import React, { useState } from 'react';
import EarnBox from '../components/earn/EarnBox';
import { EarnWrap } from '../components/style/style';
import PopupWarning from '../components/popups/PopupWarning';

const earn = [
  {
    name: 'BTC',
  },
  {
    name: 'ETH',
  },
  {
    name: 'USDT',
  },
  {
    name: 'USDC',
  },
];

const Earn = () => {
  const [showWarningPopup, setWarningPopup] = useState(true);

  return (
    <EarnWrap>
      {earn.map((val: any) => {
        return <EarnBox name={val.name} />;
      })}
      <PopupWarning showWarningPopup={showWarningPopup} setWarningPopup={setWarningPopup} />
    </EarnWrap>
  );
};

export default Earn;
