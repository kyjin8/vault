import { border } from '@mui/system';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fonts, weights, colors, sizes, borders } from '../../styles/Variables';

export const WrapBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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

export const StatusWr = styled.div`
  padding: 25px;
  border: ${borders.gray};
  border-radius: 20px;
`;

export const Tit = styled.h2`
  font-size: ${sizes.tit};
`;

export const InputBox = styled.form`
  width: 100%;
`;

export const Input = styled.input`
  border: 0;
  outline: 0;
`;

export const PwCheckList = styled.ul`
  margin: -20px 0 30px 0;
  padding: 0;
  list-style: none;
`;

export const Txt = styled.div`
  color: ${colors.gray};
  font-size: ${sizes.small};
`;

export const Links = styled(Link)`
  color: ${colors.black};
`;

export const LoginTo = styled.div`
  margin: 10px 0 0 0;
  text-align: center;
`;

// My Assets Lists
export const TabWr = styled.div`
  text-align: left;
`;

export const TotalBox = styled.div<{ margin: any }>`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: ${(props) => props.margin};
`;
export const TotalTxt = styled.span<{ fontWeight: any; textAlign: any }>`
  display: flex;
  justify-content: ${(props) => props.textAlign};
  align-items: center;
  width: 50%;
  margin: 5px 0;
  font-weight: ${(props) => props.fontWeight};
`;

export const LinkTo = styled.a`
  display: block;
  margin: 50px 0;
  color: ${colors.black};
  font-weight: ${weights.bold};
  text-align: center;

  span {
    text-decoration: underline;
  }
`;

export const ItemWr = styled.ul`
  margin: 0 0 0 -20px;
`;

// My Assets Products Box
export const AssetContents = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px;
  margin: 20px 0;
  border: ${borders.gray};
  border-radius: 20px;
`;

// buttons style
export const BtnWr = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90px;
`;

export const BtnType1 = styled.button`
  width: 90px;
  height: 38px;
  line-height: 38px;
  background: #ffe872;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;

  :disabled {
    cursor: not-allowed;
  }

  @media all and (max-width: 979px) {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
  }
`;

export const BtnType2 = styled.button`
  width: 90px;
  height: 38px;
  margin: 5px 0;
  line-height: 38px;
  background: #fff5be;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;

  :disabled {
    cursor: not-allowed;
  }

  @media all and (max-width: 979px) {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
  }
`;

export const BtnType3 = styled.button`
  width: 90px;
  height: 38px;
  margin: 5px 0;
  line-height: 38px;
  background: #ebebeb;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;

  :disabled {
    cursor: not-allowed;
  }

  @media all and (max-width: 979px) {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
  }
`;

// Asset Info
export const Wrap = styled.div`
  margin: 80px 0;
  text-align: left;

  > strong {
    font-size: ${sizes.middle};
    font-weight: ${weights.bold};
  }
`;

export const SubTxt = styled.p`
  max-width: 500px;
  margin: 10px 0;
`;

export const TotalListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
export const AssetLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
`;

export const AssetTotalBox = styled.div`
  display: flex;
`;
export const AssetTotalTxt = styled.div``;
export const TokenTo = styled.img`
  margin: 0 15px 0 0;
  width: 40px;
  height: 40px;
`;
export const ContentsTit = styled.strong`
  font-size: ${sizes.middle};
  font-weight: ${weights.bold};
`;
export const AssetSub = styled.p`
  display: block;
`;
export const AssetTotal = styled.p`
  font-weight: ${weights.bold};
  font-size: ${sizes.middle};
`;

// vault status

export const StatusBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 25px;
  margin: 20px 0;
  border: ${borders.gray};
  border-radius: 20px;
`;

export const StatusTit = styled.strong``;
export const ProductTit = styled.strong`
  display: block;
  width: 100%;
  margin: 0 0 10px 0;
`;
export const ListBox = styled.div`
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  width: 40%;
`;

// Earn
export const EarnWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const SwitchEarn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;

  @media all and (max-width: 979px) {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

export const SwitchWr = styled.div`
  display: flex;
  align-items: center;

  .switch {
    position: absolute;
    left: -9999px;
  }
  .toggle {
    cursor: pointer;
    display: inline-block;
    position: relative;
    width: 180px;
    height: 43px;
    background: transparent;
    border-radius: 120px;
    border: solid 1px #c6c6c6;
    -webkit-transition: all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    transition: all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);

    :before {
      content: 'Open';
      left: 29px;
      color: #3a3a3a;
    }

    :after {
      right: 25px;
      color: #bbb;
      content: 'Closed';
    }

    :before,
    :after {
      position: absolute;
      top: 10px;
      z-index: 2;
      -webkit-transition: all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
      transition: all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
      font-size: 12px;
      font-weight: 600;
    }
    &.on {
      background: transparent;
    }

    &.on:after {
      color: #3a3a3a;
    }
    &.on::before {
      color: #bbb;
    }
    &.on .toggle-handler {
      width: 85px;
      -webkit-transform: translateX(52px);
      transform: translateX(52px);
      border-color: #fff;
    }
  }
  .toggle-handler {
    display: inline-block;
    position: relative;
    top: 3.4px;
    left: 37px;
    z-index: 1;
    width: 90px;
    height: 35px;
    background: #ffe872;
    border-radius: 120px;
    -webkit-transition: all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    transition: all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    -webkit-transform: translateX(-33px);
    transform: translateX(-33px);
  }
`;

// My Profile
