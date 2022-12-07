import {
  MenuItem,
  Button,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import { LinkButton, Main, Span, H2, Div } from "./index.style";

import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
import { useToast } from "../../contexts/ToastContext";

const InvoiceForm = () => {
  const navigate = useNavigate();
  const { toastOpenSuccess } = useToast()

  const [clientes, setClientes] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [invoice, setInovice] = useState({
    clientId: "",
    serviceId: "",
    aliquota: 2.4,
    valor: "",
    desconto: 0,
    observacao: ""
  });

  const atualizarNota = (value, property) => {
    setInovice((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

  const postNota = () => {
    axios
      .post(`http://localhost:3333/invoice`, { invoice })
      .then(() => {
        toastOpenSuccess("Solicitação de emissão de nota enviada com sucesso.")
        navigate("/nota")
      });
  };

  const getClientes = useCallback(() => {
    axios
      .get(`http://localhost:3333/client`)
      .then(({ data }) => setClientes(data));
  }, []);

  const getServices = useCallback(() => {
    axios
      .get(`http://localhost:3333/service`)
      .then(({ data }) => setServicos(data));
  }, []);

  useEffect(() => {
    getClientes();
    getServices();
  }, [getClientes, getServices]);

  return (
    <>
      <LinkButton to="/cliente">
        <ArrowBackIos />
        <Span>Voltar</Span>
      </LinkButton>

      <H2>Nova nota</H2>

      <div className="infos">
        <Span>Dados da nota</Span>
      </div>
      <Div className="content">
        <FormControl sx={{ width: "35%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}>
          <InputLabel id="demo-multiple-checkbox-label">Cliente</InputLabel>
          <Select
            label="Cliente"
            value={invoice.clientId}
            onChange={(e) => atualizarNota(e.target.value, "clientId")}
          >
            {clientes.map((cliente) => (
              <MenuItem value={cliente.id}>
                <em>{cliente.nome}</em>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: "37.5%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}>
          <InputLabel id="demo-multiple-checkbox-label">Serviço</InputLabel>
          <Select
            label="Serviço"
            value={invoice.serviceId}
            onChange={(e) => atualizarNota(e.target.value, "serviceId")}
          >
            {servicos.map((servico) => (
              <MenuItem value={servico.id}>
                <em>
                  {servico.codigo}-{servico.descricao}
                </em>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Aliquota"
          type="text"
          variant="outlined"
          margin="normal"
          value={invoice.aliquota}
          onChange={(e) => atualizarNota(e.target.value, "aliquota")}
          sx={{ width: "10%", margin: 0, marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
        />

        <TextField
          label="Valor"
          type="text"
          variant="outlined"
          margin="normal"
          value={invoice.valor}
          onChange={(e) => atualizarNota(e.target.value, "valor")}
          sx={{ width: "10%", margin: 0, backgroundColor: "white", borderRadius: "4px" }}
        />        
      </Div>
      <Div>
      <TextField
          label="Descontos"
          type="text"
          variant="outlined"
          margin="normal"
          value={invoice.desconto}
          onChange={(e) => atualizarNota(e.target.value, "desconto")}
          sx={{ width: "10%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
        />
         <TextField
          label="Observações"
          type="text"
          variant="outlined"
          margin="normal"
          value={invoice.observacao}
          onChange={(e) => atualizarNota(e.target.value, "observacao")}
          sx={{ width: "87.5%", backgroundColor: "white", borderRadius: "4px" }}
        />
      </Div>
      <div style={{ marginLeft: "auto", marginTop: "12px" }}>
        <Button
          component={Link}
          to="/nota"
          variant="contained"
          style={{ background: "gray", marginRight: "8px" }}
        >
          Cancelar
        </Button>
        <Button variant="contained" color="success" onClick={postNota}>
          Salvar
        </Button>
      </div>
    </>
  );
};

export default InvoiceForm;
