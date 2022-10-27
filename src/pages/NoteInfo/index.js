import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { LinkButton, Main } from "./index.style";

import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";

const NoteInfo = () => {
  const navigate = useNavigate();
  const { codigo } = useParams();

  const [nota, setNota] = useState({});

  useEffect(() => {
    if (codigo) {
      axios
        .get(`http://localhost:3333/invoice/${codigo}`)
        .then((result) => setNota(result.data));
    }
  }, [codigo]);

  return (
    <Main>
      <LinkButton to='/nota'>
        <ArrowBackIos />
        <span>Voltar</span>
      </LinkButton>

      <h2>NOTA FISCAL: {nota.codigoNota}</h2>
      <h3>Status: {nota.status} </h3>
      <h3>Valor: R${nota.valor}</h3>
      <h3>Aliquota: {nota.aliquota}</h3>
      <p>Código do serviço: {nota.codigo}</p>
      <p>Descrição do serviço: {nota.descricao}</p>
      <div className="infos">
        <p>Nome do cliente: {nota.clientName}</p>
        <p>Documento do cliente: {nota.documento}</p>
        <p>Email do cliente: {nota.email}</p>
        <p>Telefone do cliente: {nota.telefone}</p>
        <p>CEP: {nota.cep}</p>
        <p>UF: {nota.uf}</p>
        <p>Cidade: {nota.cidade}</p>
        <p>Bairro: {nota.bairro}</p>
        <p>Logadouro: {nota.logadouro}</p>
        <p>N°: {nota.numero}</p>
        <p>Complemento: {nota.complemento}</p>
      </div>
    </Main>
  );
};

export default NoteInfo;
