import React, { useState } from 'react';

import LoginBox from '../components/login/LoginBox';
import Token from '../images/token_ssu.svg';
import GlobalStyle from '../styles/GlobalStyle';
import { VaultLayout, VaultWr, Logo, HomeLink } from '../styles/Style';

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <VaultLayout>
      <VaultWr>
        <GlobalStyle />
        <Logo>
          <img src={Token} alt="token ssu" />
          <HomeLink to="/">Sunny Side Up</HomeLink>
        </Logo>
        <LoginBox />
      </VaultWr>
    </VaultLayout>
  );
};

export default Login;
