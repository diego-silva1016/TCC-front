import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { LinkButton, Span, H2 } from "./index.style";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
import { useToast } from "../../contexts/ToastContext";

const CompanyForm = () => {
  const navigate = useNavigate();
  const { toastOpenSuccess } = useToast()

  const [empresa, setEmpresa] = useState({
    razaoSocial: "",
    nomeFantasia: "",
    email: "",
    password: "",
    inscricaoEstadual: "",
    inscricaoMunicipal: "",
    codigoUfIbge: "",
    codigoCidadeIbge: "",
    pais: "",
    codigoServMunicipal: "",
    descricao: "",
    aliquotas: "",
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

    return documento.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }

  const findCep = () => {
    axios
      .get(`https://viacep.com.br/ws/${empresa.cep}/json/`)
      .then(({ data }) =>
        setEmpresa((prevState) => ({
          ...prevState,
          uf: data.uf,
          cidade: data.localidade,
          bairro: data.bairro,
          logradouro: data.logradouro,
        }))
      );
  };

  const atualizarEmpresa = (value, property) => {
    setEmpresa((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

  const postEmpresa = () => {
    axios
      .post(`http://localhost:3333/company`, { company: empresa })
      .then(() => {
        navigate("/")
        toastOpenSuccess("Empresa cadastrada com sucesso.")
      });
  };

  return (
    <>
      <LinkButton to="/">
        <ArrowBackIos />
        <Span>Voltar</Span>
      </LinkButton>

      <H2>Cadastro de Empresa</H2>

      <div className="infos">
      <Span>Dados de acesso</Span><div>
          <TextField
            label="Email*"
            type="text"
            variant="outlined"
            margin="normal"
            value={empresa.email}
            onChange={(e) => atualizarEmpresa(e.target.value, "email")}
            sx={{ width: "25%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="Senha*"
            type="text"
            variant="outlined"
            margin="normal"
            value={empresa.password}
            onChange={(e) => atualizarEmpresa(e.target.value, "password")}
            sx={{ width: "20%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="Confirmar senha*"
            type="text"
            variant="outlined"
            margin="normal"
            sx={{ width: "27%", backgroundColor: "white", borderRadius: "4px" }}
          />
        </div>

            <Span>Dados Empresariais</Span>
        <div>
          <TextField
            label="Nome Fantasia*"
            type="text"
            variant="outlined"
            margin="normal"
            value={empresa.nomeFantasia}
            onChange={(e) => atualizarEmpresa(e.target.value, "nomeFantasia")}
            sx={{ width: "25%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="Razão Social*"
            type="email"
            variant="outlined"
            margin="normal"
            value={empresa.razaoSocial}
            onChange={(e) => atualizarEmpresa(e.target.value, "razaoSocial")}
            sx={{ width: "20%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="CNPJ*"
            type="text"
            variant="outlined"
            margin="normal"
            value={formataCPF(empresa.documento)}
            onChange={(e) => {
              var documento = e.target.value.replace(/[^\d]/g, "");
              if (documento.length <= 14)
                atualizarEmpresa(documento, "documento");
            }}
            sx={{ width: "27%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="Telefone*"
            type="text"
            variant="outlined"
            margin="normal"
            value={empresa.telefone.replace(
              /^(\d{2})(\d{5})(\d{4})/,
              "($1)$2-$3"
            )}
            onChange={(e) => atualizarEmpresa(e.target.value, "telefone")}
            sx={{ width: "20%", backgroundColor: "white", borderRadius: "4px", marginLeft:"2.3rem" }}
          />
        </div>
        <div>
          <TextField
            label="Inscrição Estadual*"
            type="text"
            variant="outlined"
            margin="normal"
            value={empresa.inscricaoEstadual}
            onChange={(e) => atualizarEmpresa(e.target.value, "inscricaoEstadual")}
            sx={{ width: "16%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="Inscrição Municipal*"
            type="text"
            variant="outlined"
            margin="normal"
            value={empresa.inscricaoMunicipal}
            onChange={(e) => atualizarEmpresa(e.target.value, "inscricaoMunicipal")}
            sx={{ width: "16%", backgroundColor: "white", borderRadius: "4px", marginLeft: "2rem" }}
          />
          <TextField
            label="Código IBGE (UF)*"
            type="text"
            variant="outlined"
            margin="normal"
            value={empresa.codigoUfIbge}
            onChange={(e) => atualizarEmpresa(e.target.value, "codigoUfIbge")}
            sx={{ width: "16%", backgroundColor: "white", borderRadius: "4px", marginLeft: "2rem" }}
          />
          <TextField
            label="Código IBGE (Cidade)*"
            type="text"
            variant="outlined"
            margin="normal"
            value={empresa.codigoCidadeIbge}
            onChange={(e) => atualizarEmpresa(e.target.value, "codigoCidadeIbge")}
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
            value={empresa.cep}
            onChange={(e) => atualizarEmpresa(e.target.value, "cep")}
            onBlur={findCep}
            sx={{ width: "20%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="UF*"
            type="text"
            value={empresa.uf}
            onChange={(e) => atualizarEmpresa(e.target.value, "uf")}
            variant="outlined"
            margin="normal"
            sx={{ width: "10%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="País*"
            type="text"
            value={empresa.pais}
            onChange={(e) => atualizarEmpresa(e.target.value, "pais")}
            variant="outlined"
            margin="normal"
            sx={{ width: "10%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="Cidade*"
            type="text"
            value={empresa.cidade}
            onChange={(e) => atualizarEmpresa(e.target.value, "cidade")}
            variant="outlined"
            margin="normal"
            sx={{ width: "20%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="Bairro*"
            type="text"
            value={empresa.bairro}
            onChange={(e) => atualizarEmpresa(e.target.value, "bairro")}
            variant="outlined"
            margin="normal"
            sx={{ width: "30%", backgroundColor: "white", borderRadius: "4px" }}
          />
        </div>
        <div>
          <TextField
            label="Logradouro*"
            type="text"
            value={empresa.logradouro}
            onChange={(e) => atualizarEmpresa(e.target.value, "logradouro")}
            variant="outlined"
            margin="normal"
            sx={{ width: "32.5%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="Número"
            type="text"
            value={empresa.numero}
            onChange={(e) => atualizarEmpresa(e.target.value, "numero")}
            variant="outlined"
            margin="normal"
            sx={{ width: "20%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="Complemento"
            type="text"
            value={empresa.complemento}
            onChange={(e) => atualizarEmpresa(e.target.value, "complemento")}
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
            value={empresa.codigoServMunicipal}
            onChange={(e) => atualizarEmpresa(e.target.value, "codigoServMunicipal")}
            onBlur={findCep}
            sx={{ width: "20%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="Aliquotas*"
            type="text"
            value={empresa.aliquotas}
            onChange={(e) => atualizarEmpresa(e.target.value, "aliquotas")}
            variant="outlined"
            margin="normal"
            sx={{ width: "10%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
          />
          <TextField
            label="Descrição do serviço*"
            type="text"
            value={empresa.descricao}
            onChange={(e) => atualizarEmpresa(e.target.value, "descricao")}
            variant="outlined"
            margin="normal"
            sx={{ width: "65%", backgroundColor: "white", borderRadius: "4px" }}
          />
        </div>
      </div>

      <div style={{ marginLeft: "auto", marginTop: "4px" }}>
        <Button
          component={Link}
          to="/"
          variant="contained"
          style={{ background: "gray", marginRight: "8px" }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={postEmpresa}
        >
          Salvar
        </Button>
      </div>
    </>
  );
};

export default CompanyForm;
