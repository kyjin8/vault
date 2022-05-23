import React, { useState } from 'react';
import styled from 'styled-components';
// import EarnBox from '../components/earn/EarnBox';
import EarnList from '../components/earn/EarnList';
import { EarnWrap } from '../components/style/style';
import { Wrap, WrapBox, SubTxt, SwitchWr, TokenTo } from '../components/style/style';
import TimeLine from '../components/common/Timeline';
import PopupWarning from '../components/popups/PopupWarning';

const earn = [
  {
    name: 'ASSET NAME',
    apr: '00.00%',
    epoch: 'XXX epoch - XXX epoch',
    setIsLaunch: false,
  },
  {
    name: 'ASSET NAME',
    apr: '00.00%',
    epoch: 'XXX epoch - XXX epoch',
    setIsLaunch: true,
  },
];

const Earn = () => {
  const [showWarningPopup, setWarningPopup] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [isLaunch, setIsLaunch] = useState(false);

  return (
    <>
      <TimeWr>
        <TimeLine />
      </TimeWr>
      <Wrap>
        <strong>Start Investing now</strong>
        <WrapBox>
          <SubTxt>Launch the vaults that best suits your financial goals.</SubTxt>
          <SwitchWr>
            <label
              htmlFor="switch"
              className={isChecked ? 'toggle on' : 'toggle'}
              onChange={() => {
                setIsChecked(!isChecked);
              }}
            >
              <span className="toggle-handler" />
              <input type="checkbox" id="switch" className="switch" />
            </label>
          </SwitchWr>
        </WrapBox>
        {earn.map((val) => {
          console.log(setIsLaunch);
          return (
            <>
              <EarnList name={val.name} apr={val.apr} epoch={val.epoch} setIsLaunch={val.setIsLaunch} />
            </>
          );
        })}

        <PopupWarning showWarningPopup={showWarningPopup} setWarningPopup={setWarningPopup} />
      </Wrap>
    </>
  );
};

export default Earn;

const TimeWr = styled.div`
  margin: 20px 0 50px 0;
  > div {
    margin: 0 auto;
    border: solid 1px #cecece;
    border-radius: 20px;
  }
`;
