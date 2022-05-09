import React from 'react';
import styled from 'styled-components';

import { weights, colors, sizes } from '../../styles/Variables';

export type ButtonProps = {
  txt?: string;
};

const Button: React.FC<ButtonProps> = ({ txt }) => {
  return <Buttons>{txt}</Buttons>;
};

export default Button;

const Buttons = styled.button`
  width: 100%;
  height: 45px;
  margin: 20px 0px 10px;
  background: ${colors.yellow};
  border-radius: 10px;
  font-size: ${sizes.normal};
  line-height: 45px;
  text-align: center;
  font-weight: ${weights.bold};
`;
