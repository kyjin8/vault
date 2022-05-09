import React, { useState } from 'react';
import styled from 'styled-components';

import { fonts, weights, colors, sizes } from '../../styles/Variables';

export type TextFieldProps = {
  info?: string;
  label?: React.ReactNode;
  placeholder?: string;

  className?: string;
  style?: React.CSSProperties;
};

const TextField: React.FC<TextFieldProps> = ({ info, label, placeholder, ...props }) => {
  const [focused, focus] = useState(false);

  return (
    <Wrap>
      <Tit>
        {info}
        <Star>*</Star>
      </Tit>
      <Forms>
        <Label htmlFor="label">
          <Input type="text" placeholder={placeholder} />
        </Label>
      </Forms>
    </Wrap>
  );
};

export default TextField;

/* TextField style */

const Wrap = styled.div``;

const Tit = styled.div`
  display: block;
  margin: 0 0 10px 0;
  font-weight: ${weights.bold};
`;

const Star = styled.i`
  margin: 0 0 0 3px;
  font-weight: ${weights.bold};
  color: ${colors.red};
`;

const Forms = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 40px;
  margin-bottom: 30px;
  border-bottom: 1px solid #3a3a3a;
  transition: border-color 0.15s ease;
  font-size: ${sizes.normal};

  &::placeholder {
    color: ${colors.gray};
    font-size: ${sizes.normal};
  }

  &:focus {
    border-color: ${colors.red};
  }
`;

const Label = styled.label`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  border: 0;
  outline: 0;
  font-family: Poppins;
  color: ${colors.gray};
`;
