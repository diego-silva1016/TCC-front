import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Main } from "./index.style";

import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const ServiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [service, setService] = useState({
    codigo: "",
    descricao: "",
  });

  const atualizarService = (value, property) => {
    setService((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

  const postService = () => {
    axios
      .post(`http://localhost:3333/service`, { service })
      .then(() => navigate("/servico"));
  };

  const updateService = () => {
    axios
      .put(`http://localhost:3333/service`, { service })
      .then(() => navigate("/servico"));
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3333/service/${id}`)
        .then((result) => setService(result.data));
    }
  }, [id]);

  return (
    <Main>
      <h2>Novo serviço</h2>

      <div className="infos">
        <span>Dados do serviço</span>

        <div>
          <TextField
            label="Codigo"
            type="number"
            variant="outlined"
            margin="normal"
            value={service.codigo}
            onChange={(e) => atualizarService(e.target.value, "codigo")}
            sx={{ width: "20%", marginRight: "2.5%" }}
          />
          <TextField
            label="Descrição"
            type="text"
            variant="outlined"
            margin="normal"
            value={service.descricao}
            onChange={(e) => atualizarService(e.target.value, "descricao")}
            sx={{ width: "77.5%" }}
          />
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
              onClick={id ? updateService : postService}
            >
              Salvar
            </Button>
          </div>
      </div>
    </Main>
  );
};

export default ServiceForm;