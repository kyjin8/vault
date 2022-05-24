import React from 'react';
import { TotalBox, TotalTit, TotalTxt } from '../style/style';

export type ListProps = {
  name?: string;
  amount?: string;
};

const TotalList: React.FC<ListProps> = ({ name, amount }) => {
  return (
    <>
      <TotalTit fontWeight="normal">{name}</TotalTit>
      <TotalTxt>{amount}</TotalTxt>
    </>
  );
};

export default TotalList;
