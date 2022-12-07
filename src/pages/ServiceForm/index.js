import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { LinkButton, Main, Span, H2 } from "./index.style";
import { ArrowBackIos } from "@mui/icons-material";

import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext";

const ServiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toastOpenSuccess } = useToast()

  const [service, setService] = useState({
    codigo: "",
    descricao: "",
    valorConfins: 0,
    valorCsll: 0,
    valorInss: 0,
    valorIr: 0,
    valorPis: 0
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
      .then(() => {
        toastOpenSuccess("Serviço cadastrado com sucesso.")
        navigate("/servico")
      });
  };

  const updateService = () => {
    axios
      .put(`http://localhost:3333/service`, { service })
      .then(() => {
        toastOpenSuccess("Serviço editado com sucesso.")
        navigate("/servico")
      });
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
      <LinkButton to="/servico">
        <ArrowBackIos />
          <Span>Voltar</Span>
      </LinkButton>
      <H2>Novo serviço</H2>

      <div className="infos">
        <Span>Dados do serviço</Span>

        <div>
          <TextField
            label="Codigo"
            type="number"
            variant="outlined"
            margin="normal"
            value={service.codigo}
            onChange={(e) => atualizarService(e.target.value, "codigo")}
            sx={{ width: "20%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px"  }}
          />
          <TextField
            label="Descrição"
            type="text"
            variant="outlined"
            margin="normal"
            value={service.descricao}
            onChange={(e) => atualizarService(e.target.value, "descricao")}
            sx={{ width: "77.5%", backgroundColor: "white", borderRadius: "4px"  }}
          />
        </div>
        <div>
          <TextField
            label="Valor confins"
            type="number"
            variant="outlined"
            margin="normal"
            value={service.valorConfins}
            onChange={(e) => atualizarService(e.target.value, "valorConfins")}
            sx={{ width: "18%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px"  }}
          />
          <TextField
            label="Valor csll"
            type="number"
            variant="outlined"
            margin="normal"
            value={service.valorCsll}
            onChange={(e) => atualizarService(e.target.value, "valorCsll")}
            sx={{ width: "18%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px"  }}
          />
          <TextField
            label="Valor inss"
            type="number"
            variant="outlined"
            margin="normal"
            value={service.valorInss}
            onChange={(e) => atualizarService(e.target.value, "valorInss")}
            sx={{ width: "18%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px"  }}
          />
          <TextField
            label="Valor ir"
            type="number"
            variant="outlined"
            margin="normal"
            value={service.valorIr}
            onChange={(e) => atualizarService(e.target.value, "valorIr")}
            sx={{ width: "18%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px"  }}
          />
          <TextField
            label="Valor pis"
            type="number"
            variant="outlined"
            margin="normal"
            value={service.valorPis}
            onChange={(e) => atualizarService(e.target.value, "valorPis")}
            sx={{ width: "18%", backgroundColor: "white", borderRadius: "4px"  }}
          />
        </div>
        <div style={{ marginLeft: "auto", marginTop: "4px" }}>
            <Button
              component={Link}
              to="/servico"
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
