import styled from "styled-components";
import background from "../../assets/background.png";

export const Container = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    
    width: 100%;
    height: 100vh;
    background-image: url(${background});
    background-size: cover;
`
export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 26%;
    margin-right: auto;
    margin-bottom: auto;
    margin-top: 8%;

    h1 {
        font-family: arial;
        font-size: 8rem;
        color: azure;
    }
    i {
        font-family: arial;
        font-size: 10rem;
        color: azure;
        margin-left: 7rem;
    }
`

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    width: 20rem;
    height: 20rem;
    background: #fff;
    opacity: 90%;

    margin-left: auto;
    margin-right: 3rem;
    border-radius: 4px;
    border: 2px;
    padding: 12px;
    -webkit-box-shadow: 0px 0px 8px 2px #000000;
    -moz-box-shadow: 0px 0px 8px 2px #000000;
    box-shadow: 0px 0px 8px 2px #000000;

    h1 {
        margin-top: 10px;
        font-family: arial;
        margin-bottom: 20px;
    }
`