import { Link } from "react-router-dom";
import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 80px;
  background-color: #95aac9;
  color: #fff;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;

  padding: 24px;
  color: #000000;

  .title {
    margin-left: 2rem;
    margin-top: 2rem;
    color: #505050;
  }

  .flex {
    display: flex;
    align-items: center;
    margin-top: 8px;

    span {
      margin-left: 8px;
    }
  }

  .infos {
    display: flex;
    margin-top: 24px;
    margin-left: 2rem;
    justify-content: space-around;
    font-size: 20px;
    color: white;

    span {
      color: #95aac9;
      font-weight: bold;
    }
  }

  .infosBottom {
    display: flex;
    margin-top: 24px;
    margin-left: 2rem;
    justify-content: space-around;
    font-size: 20px;
    color: white;

    span {
      color: #95aac9;
      font-weight: bold;
    }
  }
`;

export const LinkButton = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  color: #1976d2;

  display: flex;
  align-items: center;
  margin-bottom: 12px;

  svg {
    height: 18px;
    width: 15px;
  }

  &:hover {
    opacity: 0.8;
  }
`;
