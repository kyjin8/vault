// import { values } from 'lodash';
import React, { useState } from 'react';
import { WrapBox, Wrap, StatusBox, SwitchEarn, SwitchWr, ListBox, ProductTit, SubTxt } from '../style/style';
import TotalList from './TotalList';
import Timeline from '../common/Timeline';
import { products, ProductInfo } from '../../action/products';

const status = [
  {
    name: 'Lock up amount',
    amount: '000.000 COIN',
  },
  {
    name: 'Estimated SSU Rewards',
    amount: '000.000',
  },
  {
    name: 'Estimated *** Rewards',
    amount: '000.000',
  },
];

const ValutStatus = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Wrap>
      <strong>Vault Status</strong>
      <WrapBox>
        <SubTxt>
          When claiming your rewards, you will need to select between SSU and the respective token in which to redeem
          your rewards.
        </SubTxt>
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
      {products.map((product: ProductInfo) => {
        return (
          <StatusBox>
            <ProductTit>{product.prdNm}</ProductTit>
            <ListBox>
              {status.map((val: any) => {
                return <TotalList name={val.name} amount={val.amount} />;
              })}
            </ListBox>
            <Timeline operStart={product.operationStartEpoch} operEnd={product.operationEndEpoch} />
          </StatusBox>
        );
      })}
    </Wrap>
  );
};

export default ValutStatus;
