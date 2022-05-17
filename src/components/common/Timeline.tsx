import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ProgressBar from './epoch/ProgressBar';
import { parseMs } from './epoch/Epoch';
import { useEpochInfo, OperationEpochInfo } from '../../action/queries';

export type EpochProps = {
  operStart: number;
  operEnd: number;
};

export type EpochResult = {
  currentEpoch: number;
  progress: number;
  msUntilEndEpoch: number;
}

const Timeline = ({ operStart, operEnd }: EpochProps) => {
  // const { data } = useEpochInfo();
  const [progress, setProgress] = useState(0);
  const [ms, setMs] = useState(0);

  useEffect(() => {
    const ttt = async () => {
      await OperationEpochInfo(operStart, operEnd)
        .then(res => {
          setProgress(res.progress);
          setMs(res.msUntilEndEpoch);
        });
    };
    ttt();
  }, []);

  return (
    <EpochWr>
      <EpochTit>
        <span>TimeLine</span>
      </EpochTit>
      {/* <EpochBox>
        <strong>{data?.currentEpoch ?? ""}</strong>
        <ProgressBar
          label={`ETA ${parseMs(data?.msUntilNextEpoch ?? 0)}`}
          value={data?.progress ?? 0}
        />
        <strong className="epoch-txt">
          {data?.currentEpoch ? data?.currentEpoch + 1 : ""}
        </strong>
      </EpochBox> */}
      <EpochBox>
        <strong>{operStart}</strong>
        <ProgressBar label={`ETA ${parseMs(ms ?? 0)}`} value={progress} />
        <strong className="epoch-txt">{operEnd}</strong>
      </EpochBox>
    </EpochWr>
  );
};

export default Timeline;

/* Timeline style */

const EpochWr = styled.div`
  position: relative;
  width: 100%;
  max-width: 603px;
  min-width: 320px;
  padding: 22px 31px;
  text-align: left;

  @media all and (max-width: 979px) {
    padding: 20px;
    margin: 0 auto 24px;
  }
`;

const EpochTit = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 15px 0;

  span {
    display: inline-block;
    margin: 0 5px 0 0;
    font-size: 16px;

    @media all and (max-width: 979px) {
      font-size: 14px;
    }
  }

  .epoch-info {
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 3;
    display: none;
    min-width: 294px;
    padding: 13px;
    background: rgba(223, 223, 223, 0.9);
    border-radius: 10px;
    font-size: 12px;
    font-weight: 400;
    color: #3e3a3a;
  }

  i {
    position: relative;
    cursor: pointer;

    &:hover {
      .epoch-info {
        display: block;
      }
    }
  }
`;

const EpochBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  strong {
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    vertical-align: middle;

    @media all and (max-width: 979px) {
      font-size: 18px;
    }

    &.epoch-txt {
      color: #dddddd;
    }
  }
`;
