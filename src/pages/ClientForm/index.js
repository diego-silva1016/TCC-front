import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { LinkButton, Main, Span, H2 } from "./index.style";

import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
import { useToast } from "../../contexts/ToastContext";

const ClientForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toastOpenSuccess } = useToast()

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
      .then(() => {
        toastOpenSuccess("Cliente cadastrado com sucesso.")
        navigate("/cliente")
      });
  };

  const updateCliente = () => {
    axios
      .put(`http://localhost:3333/client`, { cliente })
      .then(() => {
        toastOpenSuccess("Cliente editado com sucesso.")
        navigate("/cliente")
      });
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

      <H2>Novo cliente</H2>

      <div className="infos">
        <Span>Dados pessoais</Span>

        <div>
          <TextField
            label="Nome completo*"
            type="text"
            variant="outlined"
            margin="normal"
            value={cliente.nome}
            onChange={(e) => atualizarCliente(e.target.value, "nome")}
            sx={{ width: "40%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="Email*"
            type="email"
            variant="outlined"
            margin="normal"
            value={cliente.email}
            onChange={(e) => atualizarCliente(e.target.value, "email")}
            sx={{ width: "35%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="CPF/CNPJ*"
            type="text"
            variant="outlined"
            margin="normal"
            value={formataCPF(cliente.documento)}
            onChange={(e) => {
              var documento = e.target.value.replace(/[^\d]/g, "");
              if (documento.length <= 14)
                atualizarCliente(documento, "documento");
            }}
            sx={{ width: "20%", backgroundColor: "white", borderRadius: "4px" }}
          />
        </div>
        <div>
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
            sx={{ width: "20%", backgroundColor: "white", borderRadius: "4px" }}
          />
        </div>
      </div>

      <div className="infos">
        <Span>Endere??o</Span>

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
            sx={{ width: "42.5%", backgroundColor: "white", borderRadius: "4px" }}
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
            label="N??mero"
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

export default ClientForm;
