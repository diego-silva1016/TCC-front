import { Container, LoginContainer, TitleContainer } from "./index.style.js";
import { TextField, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const signin = () => {
    navigate("/cliente");
  };

  return (
    <Container>
      <TitleContainer>
        <h1>Easy</h1>
        <p>Invoice</p>
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
          style={{ width: "210px", marginTop: "8px" }}
          variant="contained"
          color="success"
          onClick={signin}
        >
          Entrar
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default Login;
