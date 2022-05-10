import React from 'react';
import { useProgressBar } from '@react-aria/progress';

const ProgressBar = (props: any) => {
    const { label, showValueLabel = !!label, value, minValue = 0, maxValue = 100 } = props;
    const { progressBarProps, labelProps } = useProgressBar(props);
  
    // Calculate the width of the progress bar as a percentage
    const percentage = (value - minValue) / (maxValue - minValue);
    const barWidth = `${Math.round(percentage * 100)}%`;
  
    return (
      /* eslint-disable react/jsx-props-no-spreading */
      <div {...progressBarProps} style={{ width: '100%', minWidth: 200, margin: '0 10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {showValueLabel && <span>{(percentage * 100).toFixed(1)}%</span>}
          {label && <span {...labelProps}>{label}</span>}
        </div>
        <div style={{ height: 10, background: '#EDEDED' }}>
          <div style={{ width: barWidth, height: 10, background: '#FFE872' }} />
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
  