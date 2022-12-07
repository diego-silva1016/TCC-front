import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { LinkButton, Main } from "./index.style";

import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
import PDF from '../../assets/NotaTeste.pdf'
import { useToast } from "../../contexts/ToastContext";

const NoteInfo = () => {
  const { toastOpenSuccess } = useToast()
  const { id } = useParams();

  const [nota, setNota] = useState({});

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3333/invoice/${id}`)
        .then((result) => setNota(result.data));
    }
  }, [id]);

  const cancelNote = () => {
    axios
      .put(`http://localhost:3333/invoice/${id}`)
      .then((result) => {
        toastOpenSuccess("Nota cancelada com sucesso.")
        setNota(result.data)
      });
  }

  return (
    <Main>
      <LinkButton to='/nota'>
        <ArrowBackIos />
        <span>Voltar</span>
      </LinkButton>
      <div className="title">
        <strong style={{ fontSize: '20px', marginBottom: '12px' }}>Dados gerais</strong>

        <div className="flex" style={{ marginBottom: '12px' }}>
          <strong>Chave da nota:</strong><span>15789456324785021478965238965478965423014587</span>
          <strong style={{ marginLeft: '20px' }}>Status:</strong><span>{nota.status}</span>
          <strong style={{ marginLeft: '20px' }}>Data de emissão:</strong><span>{new Date(nota.dataEmissao).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })}</span>
          <strong style={{ marginLeft: '20px' }}>Valor:</strong><span>R${nota.valor}</span>
          <strong style={{ marginLeft: '20px' }}>Desconto:</strong><span>R${nota.desconto}</span>
        </div>
        <div className="flex" style={{ marginBottom: '32px' }}>
          <strong>Observação:</strong><span>{nota.observacao ? nota.observacao : '-'}</span>
        </div>

        <strong style={{ fontSize: '20px', marginBottom: '12px' }}>Dados do serviço</strong>

        <div className="flex" style={{ marginBottom: '32px' }}>
          <strong>Código:</strong><span>{nota.codigo}</span>
          <strong style={{ marginLeft: '20px' }}>Descrição:</strong><span>{nota.descricao}</span>
          <strong style={{ marginLeft: '20px' }}>Aliquota:</strong><span>{nota.aliquota}%</span>
        </div>

        <strong style={{ fontSize: '20px', marginBottom: '12px' }}>Dados do cliente</strong>

        <div className="flex" style={{ marginBottom: '12px' }}>
          <strong>Nome:</strong><span>{nota.clientName}</span>
          <strong style={{ marginLeft: '20px' }}>Documento:</strong><span>{nota.documento}</span>
          <strong style={{ marginLeft: '20px' }}>Email:</strong><span>{nota.email}</span>
          <strong style={{ marginLeft: '20px' }}>Telefone:</strong><span>{nota.telefone}</span>
        </div>
        <div className="flex">
          <strong>CEP:</strong><span>{nota.cep}</span>
          <strong style={{ marginLeft: '20px' }}>UF:</strong><span>{nota.uf}</span>
          <strong style={{ marginLeft: '20px' }}>Cidade:</strong><span>{nota.cidade}</span>
          <strong style={{ marginLeft: '20px' }}>Bairro:</strong><span>{nota.bairro}</span>
          <strong style={{ marginLeft: '20px' }}>Logradouro:</strong><span>{nota.logradouro}</span>
          <strong style={{ marginLeft: '20px' }}>Número:</strong><span>{nota.numero}</span>
          <strong style={{ marginLeft: '20px' }}>Complemento:</strong><span>{nota.complemento ? nota.complemento : '-'}</span>
        </div>
      </div>

      <div className="flex" style={{ justifyContent: 'center', marginTop: '40px' }}>
        {nota.status !== "Cancelada" && <Button
          variant="contained"
          color='error'
          onClick={cancelNote}
        >
          Cancelar
        </Button>}

        <Button
          variant="contained"
          color='primary'
          style={{ marginLeft: '24px' }}
        >
          Download XML
        </Button>
        <a href={PDF} download='nota' style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color='primary'
            style={{ marginLeft: '24px' }}
          >
            Download PDF
          </Button>
        </a>
      </div>
    </Main>
  );
};

export default NoteInfo;
