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