import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TotalBox, TotalTit, TotalTxt } from '../style/style';

export enum STATUS_TYPE {
  STARTED = 'STARTED',
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  DENIED = 'DENIED',
}

const getBg = (statusType: STATUS_TYPE) => {
  switch (statusType) {
    case STATUS_TYPE.STARTED:
      return '#FFE872';
    case STATUS_TYPE.APPROVED:
      return '#5DD6AE';
    case STATUS_TYPE.PENDING:
      return '#D7D5D3';
    case STATUS_TYPE.DENIED:
      return '#FF8F8F';
    default:
      return '';
  }
};

const getButtonLabel = (statusType: STATUS_TYPE) => {
  switch (statusType) {
    case STATUS_TYPE.STARTED:
      return 'Get started';
    case STATUS_TYPE.APPROVED:
      return 'Approved';
    case STATUS_TYPE.PENDING:
      return 'Pending';
    case STATUS_TYPE.DENIED:
      return 'Denied, click to retry';
    default:
      return 'Get started';
  }
};

const KYCStatus = () => {
  const [statusType, setstatusType] = useState(STATUS_TYPE.STARTED);

  useEffect(() => {
    const getKYC = async () => {
      await setstatusType(STATUS_TYPE.APPROVED);
    };
    getKYC();
  }, []);

  return (
    <TotalBox>
      <TotalTit>Your KYC Status</TotalTit>
      <Btn bg={getBg(statusType)}>{getButtonLabel(statusType)}</Btn>
    </TotalBox>
  );
};

export default KYCStatus;

const Btn = styled.button<{ bg: any }>`
  padding: 0 15px;
  border-radius: 10px;
  font-weight: bold;
  background: ${(props) => props.bg};
`;
