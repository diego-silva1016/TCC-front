import { Link } from "react-router-dom";
import styled from "styled-components";

export const LinkButton = styled(Link)`
    text-decoration: none;
    color: #fff;

    border-bottom: ${({active}) => active && '2px solid #fff'};
    margin-right: 12px;

    &:hover{
        opacity: 0.8;
    }
`

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    background: #242222;

    padding: 24px;
    color: #a3a3a3;
    height: 88.4vh;
`;