import React, { useState } from 'react';

import SignUpBox from '../components/signup/SignUpBox';
import Token from '../images/token_ssu.svg';
import GlobalStyle from '../styles/GlobalStyle';
import { VaultLayout, VaultWr, Logo, HomeLink } from '../styles/Style';

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <VaultLayout>
      <VaultWr>
        <GlobalStyle />
        <Logo>
          <img src={Token} alt="token ssu" />
          <HomeLink to="/">Sunny Side Up</HomeLink>
        </Logo>
        <SignUpBox />
      </VaultWr>
    </VaultLayout>
  );
};

export default SignUp;
