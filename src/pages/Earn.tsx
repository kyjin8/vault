import React, { useState } from 'react';
import styled from 'styled-components';
import EarnList from '../components/earn/EarnList';
import { Wrap, WrapBox, SubTxt, SwitchWr } from '../components/style/style';
import TimeLine from '../components/common/CurrTimeline';
import PopupWarning from '../components/popups/PopupWarning';

const earn = [
  {
    name: 'ASSET NAME',
    apr: '00.00%',
    epoch: 'XXX epoch - XXX epoch',
    launch: 'launch',
  },
  {
    name: 'ASSET NAME',
    apr: '00.00%',
    epoch: 'XXX epoch - XXX epoch',
    launch: 'closed',
  },
];

const Earn = () => {
  const [showWarningPopup, setWarningPopup] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

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
        {isChecked ? (
          <>
            {earn.map((val) => {
              return (
                <>
                  <EarnList name={val.name} apr={val.apr} epoch={val.epoch} launch={val.launch} />
                </>
              );
            })}
          </>
        ) : (
          <>
            {earn.map((val) => {
              return (
                <>
                  <EarnList name={val.name} apr={val.apr} epoch={val.epoch} launch={val.launch} />
                </>
              );
            })}
          </>
        )}

        <PopupWarning showWarningPopup={showWarningPopup} setWarningPopup={setWarningPopup} />
      </Wrap>
    </>
  );
};

export default Earn;

const TimeWr = styled.div`
  margin: 20px 0 50px 0;

  > article {
    position: relative;
    width: 100%;
    max-width: 603px;
    min-width: 320px;
    padding: 22px 31px;
    margin: 0 auto;
    border: solid 1px #cecece;
    border-radius: 20px;
    text-align: left;

    @media all and (max-width: 979px) {
      padding: 20px;
      margin: 0 auto 24px;
    }
  }
`;
