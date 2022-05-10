import React, { useState } from 'react';
import { TotalBox, TotalTit, TotalTxt } from '../style/style';

export enum STATUS_TYPE {
  STARTED = 'STARTED',
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  DENIED = 'DENIED',
}

const getTitle = (statusType: STATUS_TYPE) => {
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
  return (
    <TotalBox>
      <TotalTit>Your KYC Status</TotalTit>
      <TotalTxt>{getButtonLabel(statusType)}</TotalTxt>
    </TotalBox>
  );
};

export default KYCStatus;
