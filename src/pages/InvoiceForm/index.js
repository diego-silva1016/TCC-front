import {
  MenuItem,
  Button,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import { LinkButton, Main } from "./index.style";

import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";

const InvoiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [clientes, setClientes] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [invoice, setInovice] = useState({
    clientId: "",
    serviceId: "",
    aliquota: 2.4,
    valor: "",
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
      .then(() => navigate("/nota"));
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
    <Main>
      <LinkButton to="/cliente">
        <ArrowBackIos />
        <span>Voltar</span>
      </LinkButton>

      <h2>Nova nota</h2>

      <div className="infos">
        <span>Dados da nota</span>
      </div>
      <div>
        <FormControl sx={{ width: "35%", marginRight: "2.5%" }}>
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

        <FormControl sx={{ width: "37.5%",  marginRight: "2.5%"}}>
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
          sx={{ width: "10%", margin: 0,marginRight: "2.5%" }}
        />

        <TextField
          label="Valor"
          type="text"
          variant="outlined"
          margin="normal"
          value={invoice.valor}
          onChange={(e) => atualizarNota(e.target.value, "valor")}
          sx={{ width: "10%", margin: 0 }}
        />
      </div>
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
    </Main>
  );
};

export default InvoiceForm;
