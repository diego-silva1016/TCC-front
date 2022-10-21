import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Modal,
  Box,
  Typography,
} from "@mui/material";

import { Edit, DeleteOutline } from "@mui/icons-material";
import { Main } from "./index.style";
import { useCallback, useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const ListServices = () => {
  const [services, setServices] = useState([]);
  const [serviceIdToDelete, setServiceIdToDelete] = useState("");

  const getServices = useCallback(() => {
    axios
      .get(`http://localhost:3333/service`)
      .then(({ data }) => setServices(data));
  }, []);

  const deleteService = () => {
    axios
      .delete(`http://localhost:3333/service/${serviceIdToDelete}`)
      .then(() => {
        setServiceIdToDelete("")
        getServices()
      });
  }

  useEffect(() => getServices(), [getServices]);

  return (
    <>
      <Main>
        <Button
          component={Link}
          style={{ marginLeft: "auto", marginBottom: "12px" }}
          variant="contained"
          color="primary"
          to="/servico/cadastro"
        >
          Cadastrar serviço
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Codigo</TableCell>
                <TableCell align="center">Descrição</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service) => (
                <TableRow
                  key={service.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{service.codigo}</TableCell>
                  <TableCell align="center">{service.descricao}</TableCell>
                  <TableCell align="center">
                    <Link to={`/servico/${service.id}`}>
                      <Edit />
                    </Link>
                    <DeleteOutline
                      onClick={() => setServiceIdToDelete(service.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Main>
      <Modal
        open={!!serviceIdToDelete}
        onClose={() => setServiceIdToDelete("")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Excluir cliente
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Deseja mesmo excluir esse cliente?
          </Typography>

          <div style={{ marginLeft: "auto", marginTop: "16px" }}>
            <Button
              variant="contained"
              style={{
                background: "gray",
                marginRight: "8px",
              }}
              onClick={() => setServiceIdToDelete("")}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="error"    
              onClick={deleteService}          
            >
              Excluir
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ListServices;