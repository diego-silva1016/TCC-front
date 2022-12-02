import { Container, LoginContainer, TitleContainer } from "./index.style.js";
import { TextField, Button } from "@mui/material";

import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const signin = () => {
    navigate("/nota");
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
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          margin="normal"
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
