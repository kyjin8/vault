import React from 'react';

import _ from 'lodash';
import { AssetLeft, TokenTo, AssetTotalBox, AssetTotalTxt, ContentsTit, AssetSub, AssetTotal } from '../style/style';
import TokenIcon from '../../images/token_sample.svg';
import { TOKENS_ARRAY, TOKENS } from '../../action/tokens';

export type InfoProps = {
  name?: string;
  rate?: string;
  total?: string;
};

const AssetInfo: React.FC<InfoProps> = ({ name, rate, total }) => {
  console.log('TOKENS_ARRAY ', TOKENS_ARRAY.find(token => token.symbol === name).picUrl);

  return (
    <AssetLeft>
      <AssetTotalBox>
        {/* token image */}
        {/* <TokenTo src={TokenIcon} alt="token sample" /> */}
        <TokenTo src={TOKENS_ARRAY.find(token => token.symbol === name).picUrl ?? TokenIcon} alt="token img" />
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
