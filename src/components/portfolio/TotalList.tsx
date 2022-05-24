import React from 'react';
import { TotalTxt } from '../style/style';

export type ListProps = {
  name?: string;
  amount?: string;
};

const TotalList: React.FC<ListProps> = ({ name, amount }) => {
  return (
    <>
      <TotalTxt fontWeight="normal" textAlign="flex-start">
        {name}
      </TotalTxt>
      <TotalTxt fontWeight="normal" textAlign="flex-end">
        {amount}
      </TotalTxt>
    </>
  );
};

export default TotalList;
