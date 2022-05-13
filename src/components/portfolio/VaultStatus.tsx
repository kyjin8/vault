// import { values } from 'lodash';
import React, { useState } from 'react';
import { WrapBox, Wrap, StatusBox, SwitchEarn, SwitchWr, ListBox, ProductTit, SubTxt } from '../style/style';
import TotalList from './TotalList';
import Timeline from '../common/Timeline';
import { products, ProductInfo } from '../../action/products';

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
            <ProductTit>{product.name}</ProductTit>
            <ListBox>
              {status.map((val: any) => {
                return <TotalList name={val.name} amount={val.amount} />;
              })}
            </ListBox>
            <Timeline oper_start={product.operation_start_epoch} oper_end={product.operation_end_epoch} />
          </StatusBox>
        );
      })}
    </Wrap>
  );
};

export default ValutStatus;
