import React from 'react';

import Button from '../common/Button';
import TextField from '../common/TextField';
import { InputBox, Links, LoginTo } from '../style/style';

const LoginBox = () => {
  return (
    <>
      <InputBox>
        <TextField placeholder="Type email address" info="Email" />
        <TextField placeholder="Type password" info="Password" />
        <Button txt="Login" />
        <LoginTo>
          Don’t have an account? <Links to="/vault/signup">Sign up now</Links>
        </LoginTo>
      </InputBox>
    </>
  );
};

export default LoginBox;
