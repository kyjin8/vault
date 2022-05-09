import React from 'react';

import Button from '../common/Button';
import CheckList from './CheckList';
import TextField from '../common/TextField';
import { InputBox, PwCheckList, Txt, Links, LoginTo } from '../style/style';

const SignUpBox = () => {
  const checklist = [
    { txt: 'Must be 10-30 characters' },
    { txt: 'At least one number' },
    { txt: 'At least one letter' },
    { txt: 'At least one special character !@#$%^&()' },
  ];
  return (
    <>
      <InputBox>
        <TextField placeholder="text your email" info="Email" />
        <TextField placeholder="Do not share your password with anyone" info="Password" />
        <PwCheckList>
          {checklist.map((val) => {
            return <CheckList checklist={val.txt} />;
          })}
        </PwCheckList>
        <TextField placeholder="Re-type your password to confirm" info="Confirm Password" />
      </InputBox>
      <Txt>
        By creating an account, you agree to the <Links to="/terms">Terms of Service</Links> and{' '}
        <Links to="/privacy">Privacy Policy</Links>.
      </Txt>
      <Button txt="Sign Up" />
      <LoginTo>
        Already have an account? <Links to="/vault/login">Log in</Links>
      </LoginTo>
    </>
  );
};

export default SignUpBox;
