import React, {useState} from 'react'
import { Container, LoginContainer, TitleContainer } from "./index.style.js";
import { TextField, Button } from "@mui/material";

import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../../contexts/LoginContext/index.js';

const Login = () => {
  const navigate = useNavigate();
  const {login} = useAuth()
  const [params, setParams] = useState({
    email: '',
    password: ''
  })

  const signin = async () => {
    try{
      await login(params)
      navigate("/nota")
    } catch(e){
      console.log(e)
    }
  };

  return (
    <Container>
      <TitleContainer>
        <h1>Easy</h1>
        <i>Invoice</i>
      </TitleContainer>
      <LoginContainer>
        <h1>Login</h1>

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          value={params.email}
          onChange={e => setParams(prevState => ({
            ...prevState,
            email: e.target.value
          }))}
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          margin="normal"
          value={params.password}
          onChange={e => setParams(prevState => ({
            ...prevState,
            password: e.target.value
          }))}
        />
        <Button
          style={{ width: "210px", marginTop: "8px", marginBottom: '12px' }}
          variant="contained"
          color="success"
          onClick={signin}
        >
          Entrar
        </Button>

        <Link to="/empresa/cadastro" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#2b1f6a' }}>
          Cadastrar
        </Link>
      </LoginContainer>
    </Container>
  );
};

export default Login;
