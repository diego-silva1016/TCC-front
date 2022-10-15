import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { Main } from "./index.style";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [cliente, setCliente] = useState({
    nome: "",
    email: "",
    telefone: "",
    cep: "",
    uf: "",
    cidade: "",
    bairro: "",
    logradouro: "",
    numero: "",
    complemento: "",
  });

  const findCep = () => {
    axios
      .get(`https://viacep.com.br/ws/${cliente.cep}/json/`)
      .then(({ data }) =>
        setCliente((prevState) => ({
          ...prevState,
          uf: data.uf,
          cidade: data.localidade,
          bairro: data.bairro,
          logradouro: data.logradouro,
        }))
      );
  };

  const atualizarCliente = (value, property) => {
    setCliente((prevState) => ({
      ...prevState,
      [property]: value
    }));
  };

  const postClientes = () => {
    axios
      .post(`http://localhost:3333/client`, { cliente })
      .then(() => navigate("/cliente"))
  };


  return (
    <Main>
      <h2>Novo cliente</h2>

      <div className="infos">
        <span>Dados pessoais</span>

        <div>
          <TextField
            label="Nome completo"
            type="text"
            variant="outlined"
            margin="normal"
            onChange={(e) => atualizarCliente(e.target.value, "nome")}
            sx={{ width: "40%", marginRight: "2.5%" }}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            onChange={(e) => atualizarCliente(e.target.value, "email")}
            sx={{ width: "35%", marginRight: "2.5%" }}
          />
          <TextField
            label="CPF/CNPJ"
            type="text"
            variant="outlined"
            margin="normal"
            onChange={(e) => atualizarCliente(e.target.value, "documento")}
            sx={{ width: "20%" }}
          />
        </div>
        <div>
          <TextField
            label="Telefone"
            type="text"
            variant="outlined"
            margin="normal"
            onChange={(e) => atualizarCliente(e.target.value, "telefone")}
            sx={{ width: "20%" }}
          />
        </div>
      </div>

      <div className="infos">
        <span>Endereço</span>

        <div>
          <TextField
            label="CEP"
            type="text"
            variant="outlined"
            margin="normal"
            value={cliente.cep}
            onChange={(e) => atualizarCliente(e.target.value, "cep")}
            onBlur={findCep}
            sx={{ width: "20%", marginRight: "2.5%" }}
          />
          <TextField
            label="UF"
            type="text"
            value={cliente.uf}
            onChange={(e) => atualizarCliente(e.target.value, "uf")}
            variant="outlined"
            margin="normal"
            sx={{ width: "10%", marginRight: "2.5%" }}
          />

          <TextField
            label="Cidade"
            type="text"
            value={cliente.cidade}
            onChange={(e) => atualizarCliente(e.target.value, "cidade")}
            variant="outlined"
            margin="normal"
            sx={{ width: "20%", marginRight: "2.5%" }}
          />
          <TextField
            label="Bairro"
            type="text"
            value={cliente.bairro}
            onChange={(e) => atualizarCliente(e.target.value, "bairro")}
            variant="outlined"
            margin="normal"
            sx={{ width: "42.5%" }}
          />
        </div>
        <div>
          <TextField
            label="Logradouro"
            type="text"
            value={cliente.logradouro}
            onChange={(e) => atualizarCliente(e.target.value, "logradouro")}
            variant="outlined"
            margin="normal"
            sx={{ width: "32.5%", marginRight: "2.5%" }}
          />
          <TextField
            label="Número"
            type="text"
            value={cliente.numero}
            onChange={(e) => atualizarCliente(e.target.value, "numero")}
            variant="outlined"
            margin="normal"
            sx={{ width: "20%", marginRight: "2.5%" }}
          />
          <TextField
            label="Complemento"
            type="text"
            value={cliente.complemento}
            onChange={(e) => atualizarCliente(e.target.value, "complemento")}
            variant="outlined"
            margin="normal"
            sx={{ width: "42.5%" }}
          />
        </div>
      </div>

      <div style={{ marginLeft: "auto", marginTop: "4px" }}>
        <Button
          component={Link}
          to="/cliente"
          variant="contained"
          style={{ background: "gray", marginRight: "8px" }}
        >
          Cancelar
        </Button>
        <Button variant="contained" color="success" onClick={postClientes}>
          Salvar
        </Button>
      </div>
    </Main>
  );
};

export default Home;
