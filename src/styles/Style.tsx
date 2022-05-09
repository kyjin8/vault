import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Logo = styled.h1`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  margin: 0 0 30px 0;
  font-size: 14px;
  line-height: 21px;
  font-weight: 600;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    margin: 0 5px 0 0;
    vertical-align: middle;
  }
`;

export const HomeLink = styled(Link)`
  color: #3a3a3a;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    color: #3a3a3a;
    text-decoration: none;
  }
`;

export const VaultLayout = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export const VaultWr = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 50px 15px 24px;
`;

export const BoxLayout = styled.div`
  width: 100%;
  padding: 30px;
  background: #fff;
  border: 1px solid #cecece;
  border-radius: 0 20px 20px 20px;

  @media all and (max-width: 979px) {
    padding: 20px;
  }
`;

export const ContLayout = styled.main`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 130px;

  @media all and (max-width: 1440px) {
    max-width: none;
    padding: 0 50px;
  }
  @media all and (max-width: 979px) {
    padding: 0 20px;
  }
`;

export const ContWr = styled.section`
  text-align: center;
  width: 100%;
  max-width: 1182px;
  min-width: 320px;
  min-height: calc(100vh - 260px);
  margin: 40px auto 30px;

  @media all and (max-width: 979px) {
    min-height: none;
    margin: 20px auto;
  }
`;
