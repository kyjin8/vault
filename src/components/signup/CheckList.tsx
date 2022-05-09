import React from 'react';
import styled from 'styled-components';

import IconCheck from '../../images/icon_check.svg';
import { weights, colors, sizes } from '../../styles/Variables';

export type CheckProps = {
  checklist?: string;
};

const CheckList: React.FC<CheckProps> = ({ checklist }) => {
  return (
    <Item>
      <Icons src={IconCheck} alt="check password list" />
      <span>{checklist}</span>
    </Item>
  );
};

export default CheckList;

/* checklist style */

const Item = styled.li`
  display: inline-block;
  width: 50%;
  font-size: ${sizes.small};
  color: ${colors.gray};
`;

const Icons = styled.img`
  display: inline-block;
  margin: 0 4px 0 0;
`;
