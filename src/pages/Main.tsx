import React, { useState } from 'react';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

import GlobalStyle from '../styles/GlobalStyle';
import { ContLayout, ContWr, BoxLayout } from '../styles/Style';
import { TabWr, TotalListBox } from '../components/style/style';

import Header from '../components/common/Header';
import SubTxt from '../components/common/SubTxt';
import MyPortfolio from './MyPortfolio';
import Earn from './Earn';

const Main = () => {
  return (
    <ContLayout>
      <ContWr>
        <GlobalStyle />
        <Header />
        <SubTxt />
        <TabWr>
          <TabsUnstyled defaultValue={0}>
            <TabsList>
              <Tab>Earn</Tab>
              <Tab>My Portfolio</Tab>
            </TabsList>
            <TabPanel value={0}>
              <Earn />
            </TabPanel>
            <TabPanel value={1}>
              <MyPortfolio />
            </TabPanel>
          </TabsUnstyled>
        </TabWr>
      </ContWr>
    </ContLayout>
  );
};

export default Main;

// Tab menu style
const Tab = styled(TabUnstyled)`
  width: 148px;
  height: 48px;
  line-height: 48px;
  margin: 0 8px 0 0;
  border: solid 1px #cecece;
  border-bottom: 0;
  border-radius: 8px 8px 0 0;
  background: #ffe872;
  font-size: 16px;
  font-weight: 600;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: 0;
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    opacity: 1;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  padding: 30px;
  background: #fff;
  border: 1px solid #cecece;
  border-radius: 0 20px 20px 20px;

  @media all and (max-width: 979px) {
    padding: 20px;
  }
`;

const TabsList = styled(TabsListUnstyled)`
  display: flex;
  align-items: center;
  justify-content: left;
  align-content: space-between;
`;
