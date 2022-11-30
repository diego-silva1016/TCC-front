import {
  TableRow,
  TableCell,
  Button,
  Modal,
  Box,
  Typography,
} from "@mui/material";

import Table from "../../../components/Table";

import { Edit, DeleteOutline } from "@mui/icons-material";
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

const ListClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteIdToDelete, setClienteIdToDelete] = useState("");

  const getClientes = useCallback(() => {
    axios
      .get(`http://localhost:3333/client`)
      .then(({ data }) => setClientes(data));
  }, []);

  const deleteClient = () => {
    axios
      .delete(`http://localhost:3333/client/${clienteIdToDelete}`)
      .then(() => {
        setClienteIdToDelete("");
        getClientes();
      });
  };

  useEffect(() => getClientes(), [getClientes]);

  return (
    <>
      <Button
        component={Link}
        style={{ marginLeft: "auto", marginBottom: "12px" }}
        variant="contained"
        color="primary"
        to="/cliente/cadastro"
      >
        Cadastrar cliente
      </Button>
      <Table headers={["Nome", "Documento", "Telefone", "Email", "Ações"]}>
        {clientes.map((cliente) => (
          <TableRow
            key={cliente.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="center">{cliente.nome}</TableCell>
            <TableCell align="center">{cliente.documento}</TableCell>
            <TableCell align="center">{cliente.email}</TableCell>
            <TableCell align="center">{cliente.telefone}</TableCell>
            <TableCell align="center">
              <Link to={`/cliente/${cliente.id}`}>
                <Edit />
              </Link>
              <DeleteOutline
                onClick={() => setClienteIdToDelete(cliente.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </Table>
      <Modal
        open={!!clienteIdToDelete}
        onClose={() => setClienteIdToDelete("")}
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
              onClick={() => setClienteIdToDelete("")}
            >
              Cancelar
            </Button>
            <Button variant="contained" color="error" onClick={deleteClient}>
              Excluir
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ListClientes;
