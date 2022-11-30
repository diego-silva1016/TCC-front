import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { LinkButton, Main, Span, H2 } from "./index.style";

import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";

const CompanyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
    documento: "",
  });

  function formataCPF(documento) {
    documento = documento.replace(/[^\d]/g, "");
    if (documento.length <= 11) {
      return documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    return documento.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }

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
      [property]: value,
    }));
  };

  const postCliente = () => {
    axios
      .post(`http://localhost:3333/client`, { cliente })
      .then(() => navigate("/cliente"));
  };

  const updateCliente = () => {
    axios
      .put(`http://localhost:3333/client`, { cliente })
      .then(() => navigate("/cliente"));
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3333/client/${id}`)
        .then((result) => setCliente(result.data));
    }
  }, [id]);

  return (
    <>
      <LinkButton to="/cliente">
        <ArrowBackIos />
        <Span>Voltar</Span>
      </LinkButton>

      <H2>Cadastro de Empresa</H2>

      <div className="infos">
            <Span>Dados Empresariais</Span>
        <div>
          <TextField
            label="Nome Fantasia*"
            type="text"
            variant="outlined"
            margin="normal"
            value={cliente.nome}
            onChange={(e) => atualizarCliente(e.target.value, "nome")}
            sx={{ width: "25%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="Razão Social*"
            type="email"
            variant="outlined"
            margin="normal"
            value={cliente.email}
            onChange={(e) => atualizarCliente(e.target.value, "email")}
            sx={{ width: "20%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="CNPJ*"
            type="text"
            variant="outlined"
            margin="normal"
            value={formataCPF(cliente.documento)}
            onChange={(e) => {
              var documento = e.target.value.replace(/[^\d]/g, "");
              if (documento.length <= 14)
                atualizarCliente(documento, "documento");
            }}
            sx={{ width: "27%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="Telefone*"
            type="text"
            variant="outlined"
            margin="normal"
            value={cliente.telefone.replace(
              /^(\d{2})(\d{5})(\d{4})/,
              "($1)$2-$3"
            )}
            onChange={(e) => atualizarCliente(e.target.value, "telefone")}
            sx={{ width: "20%", backgroundColor: "white", borderRadius: "4px", marginLeft:"2.3rem" }}
          />
        </div>
        <div>
          <TextField
            label="Email*"
            type="text"
            variant="outlined"
            margin="normal"
            value={cliente.telefone.replace(
              /^(\d{2})(\d{5})(\d{4})/,
              "($1)$2-$3"
            )}
            onChange={(e) => atualizarCliente(e.target.value, "telefone")}
            sx={{ width: "25%", backgroundColor: "white", borderRadius: "4px"}}
          />
          <TextField
            label="Inscrição Estadual*"
            type="text"
            variant="outlined"
            margin="normal"
            value={cliente.telefone.replace(
              /^(\d{2})(\d{5})(\d{4})/,
              "($1)$2-$3"
            )}
            onChange={(e) => atualizarCliente(e.target.value, "telefone")}
            sx={{ width: "16%", backgroundColor: "white", borderRadius: "4px", marginLeft: "2rem" }}
          />
          <TextField
            label="Inscrição Municipal*"
            type="text"
            variant="outlined"
            margin="normal"
            value={cliente.telefone.replace(
              /^(\d{2})(\d{5})(\d{4})/,
              "($1)$2-$3"
            )}
            onChange={(e) => atualizarCliente(e.target.value, "telefone")}
            sx={{ width: "16%", backgroundColor: "white", borderRadius: "4px", marginLeft: "2rem" }}
          />
          <TextField
            label="Código IBGE (UF)*"
            type="text"
            variant="outlined"
            margin="normal"
            value={cliente.telefone.replace(
              /^(\d{2})(\d{5})(\d{4})/,
              "($1)$2-$3"
            )}
            onChange={(e) => atualizarCliente(e.target.value, "telefone")}
            sx={{ width: "16%", backgroundColor: "white", borderRadius: "4px", marginLeft: "2rem" }}
          />
          <TextField
            label="Código IBGE (Cidade)*"
            type="text"
            variant="outlined"
            margin="normal"
            value={cliente.telefone.replace(
              /^(\d{2})(\d{5})(\d{4})/,
              "($1)$2-$3"
            )}
            onChange={(e) => atualizarCliente(e.target.value, "telefone")}
            sx={{ width: "16.5%", backgroundColor: "white", borderRadius: "4px", marginLeft: "2rem" }}
          />
        </div>
      </div>

      <div className="infos">
        <Span>Endereço</Span>

        <div>
          <TextField
            label="CEP*"
            type="text"
            variant="outlined"
            margin="normal"
            value={cliente.cep}
            onChange={(e) => atualizarCliente(e.target.value, "cep")}
            onBlur={findCep}
            sx={{ width: "20%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="UF*"
            type="text"
            value={cliente.uf}
            onChange={(e) => atualizarCliente(e.target.value, "uf")}
            variant="outlined"
            margin="normal"
            sx={{ width: "10%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="País*"
            type="text"
            value={cliente.logradouro}
            onChange={(e) => atualizarCliente(e.target.value, "logradouro")}
            variant="outlined"
            margin="normal"
            sx={{ width: "10%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="Cidade*"
            type="text"
            value={cliente.cidade}
            onChange={(e) => atualizarCliente(e.target.value, "cidade")}
            variant="outlined"
            margin="normal"
            sx={{ width: "20%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="Bairro*"
            type="text"
            value={cliente.bairro}
            onChange={(e) => atualizarCliente(e.target.value, "bairro")}
            variant="outlined"
            margin="normal"
            sx={{ width: "30%", backgroundColor: "white", borderRadius: "4px" }}
          />
        </div>
        <div>
          <TextField
            label="Logradouro*"
            type="text"
            value={cliente.logradouro}
            onChange={(e) => atualizarCliente(e.target.value, "logradouro")}
            variant="outlined"
            margin="normal"
            sx={{ width: "32.5%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="Número"
            type="text"
            value={cliente.numero}
            onChange={(e) => atualizarCliente(e.target.value, "numero")}
            variant="outlined"
            margin="normal"
            sx={{ width: "20%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="Complemento"
            type="text"
            value={cliente.complemento}
            onChange={(e) => atualizarCliente(e.target.value, "complemento")}
            variant="outlined"
            margin="normal"
            sx={{ width: "42.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
        </div>
      </div>
      <div className="infos">
        <Span>Serviço</Span>

        <div>
          <TextField
            label="Código Serviço Municipal*"
            type="text"
            variant="outlined"
            margin="normal"
            value={cliente.cep}
            onChange={(e) => atualizarCliente(e.target.value, "cep")}
            onBlur={findCep}
            sx={{ width: "20%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="Aliquotas*"
            type="text"
            value={cliente.uf}
            onChange={(e) => atualizarCliente(e.target.value, "uf")}
            variant="outlined"
            margin="normal"
            sx={{ width: "10%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="Descrição do serviço*"
            type="text"
            value={cliente.logradouro}
            onChange={(e) => atualizarCliente(e.target.value, "logradouro")}
            variant="outlined"
            margin="normal"
            sx={{ width: "65%", backgroundColor: "white", borderRadius: "4px" }}
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
        <Button
          variant="contained"
          color="success"
          onClick={id ? updateCliente : postCliente}
        >
          Salvar
        </Button>
      </div>
    </>
  );
};

export default CompanyForm;
