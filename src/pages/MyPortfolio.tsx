import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { TotalListBox } from '../components/style/style';

import Status from '../components/portfolio/Status';
import TotalList from '../components/portfolio/TotalList';
import AssetBox from '../components/portfolio/AssetBox';
import VaultStatus from '../components/portfolio/VaultStatus';

const total = [
  {
    name: 'My asssets',
    amount: '00 USD',
  },
  {
    name: 'Lock Up Amount',
    amount: '00 USD',
  },
];

const MyPortfolio = () => {
  return (
    <>
      <Status />
      <TotalListBox>
        {total.map((val: any) => {
          return <TotalList name={val.name} amount={val.amount} />;
        })}
      </TotalListBox>
      <AssetBox />
      <VaultStatus />
    </>
  );
};

export default MyPortfolio;
