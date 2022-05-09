import React from 'react';

import { AssetLeft, TokenTo, AssetTotalBox, AssetTotalTxt, ContentsTit, AssetSub, AssetTotal } from '../style/style';
import TokenIcon from '../../images/token_sample.svg';

export type InfoProps = {
  name?: string;
  rate?: string;
  total?: string;
};

const AssetInfo: React.FC<InfoProps> = ({ name, rate, total }) => {
  return (
    <AssetLeft>
      <AssetTotalBox>
        {/* token image */}
        <TokenTo src={TokenIcon} alt="token sample" />
        <AssetTotalTxt>
          <ContentsTit>{name}</ContentsTit>
          <AssetSub>{rate}</AssetSub>
        </AssetTotalTxt>
      </AssetTotalBox>
      <AssetTotal>{total}</AssetTotal>
    </AssetLeft>
  );
};

export default AssetInfo;
