import React from 'react';
import styled from 'styled-components';
import { fonts, weights, colors, sizes } from '../../styles/Variables';

const SubTxt = () => {
  return (
    <Wrap>
      <h2>Vault</h2>
      <p>You will need to connect your wallet and complete the KYC process to start depositing. </p>
    </Wrap>
  );
};

export default SubTxt;

const Wrap = styled.div`
  max-width: 1182px;
  width: 100%;
  margin: 2vh auto 4vh;
  text-align: left;

  h2 {
    font-size: ${sizes.tit};
    font-weight: ${weights.bold};
    line-height: 60px;
  }

  p {
    font-size: 18px;
    line-height: 30px;
  }
`;
