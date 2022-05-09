/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import { fonts, weights, colors, sizes, borders } from '../styles/Variables';

import SwitchButton from '../components/common/SwitchButton';

const MyProfile = () => {
  return (
    <>
      <InfoWr>
        <Tit>Personal Information</Tit>
        <InfoBox>
          <InfoTit>Email Address</InfoTit>
          <InfoTxt>email@address.com</InfoTxt>
        </InfoBox>
        <InfoBox>
          <InfoTit>PassWord</InfoTit>
          <InfoTxt>********</InfoTxt>
        </InfoBox>
      </InfoWr>
      <InfoWr>
        <Tit>Account Status</Tit>
        <InfoBox>
          <InfoTit>KYC Verification</InfoTit>
          <InfoTxt>Approved</InfoTxt>
        </InfoBox>
      </InfoWr>
      <InfoWr>
        <Tit>Settings</Tit>
        <InfoBox>
          <InfoTit>Notifications</InfoTit>
          <InfoTxt>
            <SwitchButton />
          </InfoTxt>
        </InfoBox>
      </InfoWr>
    </>
  );
};

export default MyProfile;

const Tit = styled.strong`
  display: block;
  margin: 0 0 20px 0;
  font-size: 16px;
  font-weight: ${weights.bold};
`;

const InfoWr = styled.div`
  margin: 40px 0;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 10px 0;
`;

const InfoTit = styled.span``;
const InfoTxt = styled.span`
  color: ${colors.gray};
`;
