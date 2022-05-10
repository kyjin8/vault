// import { values } from 'lodash';
import React, { useState } from 'react';
import { Wrap, StatusBox, SwitchEarn, SwitchWr, ListBox, ProductTit, SubTxt } from '../style/style';
import TotalList from './TotalList';
import Timeline from '../common/Timeline';

const status = [
  {
    name: 'Lock up amount',
    amount: 'xxx wBTC',
  },
  {
    name: 'Estimated Earnings',
    amount: '$$$ SSU',
  },
];

const ValutStatus = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Wrap>
      <strong>Vault Status</strong>
      <SubTxt>
        When claiming your rewards, you will need to select between SSU and the respective token in which to redeem your
        rewards.
      </SubTxt>
      <SwitchEarn>
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
      </SwitchEarn>
      <StatusBox>
        <ProductTit>Product Name</ProductTit>
        <ListBox>
          {status.map((val: any) => {
            return <TotalList name={val.name} amount={val.amount} />;
          })}
        </ListBox>
        <Timeline />
      </StatusBox>
    </Wrap>
  );
};

export default ValutStatus;
