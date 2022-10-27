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
  
  const ListInvoices = () => {
    const [invoices, setInvoices] = useState([]);
  
    const getInvoices = useCallback(() => {
      axios
        .get(`http://localhost:3333/invoice`)
        .then(({ data }) => setInvoices(data));
    }, []);
  
    useEffect(() => getInvoices(), [getInvoices]);
  
    return (
      <>
        <Main>
          <Button
            component={Link}
            style={{ marginLeft: "auto", marginBottom: "12px" }}
            variant="contained"
            color="primary"
            to="/nota/cadastro"
          >
            Emitir nota
          </Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Número da nota</TableCell>
                  <TableCell align="center">Cliente</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow
                    key={invoice.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{invoice.codigoNota}</TableCell>
                    <TableCell align="center">{invoice.clientName}</TableCell>
                    <TableCell align="center">{invoice.status}</TableCell>
                    <TableCell align="center">
                    <Link to={`/nota/${invoice.codigoNota}`}>
                      <Edit />
                    </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Main>
      </>
    );
  };
  
  export default ListInvoices;
  