import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@mui/material";
import { Main } from "./index.style";
import { useCallback, useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

const ListClientes = () => {
  const [clientes, setClientes] = useState([]);

  const getClientes = useCallback(() => {
    axios
      .get(`http://localhost:3333/client`)
      .then(({ data }) => setClientes(data));
  }, []);

  useEffect(() => getClientes(), [getClientes])

  return (
    <Main>
      <Button
        component={Link}
        style={{ marginLeft: "auto", marginBottom: "12px" }}
        variant="contained"
        color="primary"
        to="/cliente/cadastro"
      >
        Cadastrar cliente
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Documento</TableCell>
              <TableCell align="center">Telefone</TableCell>
              <TableCell align="center">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow
                key={cliente.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{cliente.nome}</TableCell>
                <TableCell align="center">{cliente.documento}</TableCell>
                <TableCell align="center">{cliente.email}</TableCell>
                <TableCell align="center">{cliente.telefone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Main>
  );
};

export default ListClientes;
