import {
    TableRow,
    TableCell,
    Button,
  } from "@mui/material";

  import Table from '../../components/Table';
  
  import { Edit } from "@mui/icons-material";
  import { Main } from "./index.style";
  import { useCallback, useEffect, useState } from "react";
  
  import axios from "axios";
  import { Link } from "react-router-dom";
  
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
          <Button
            component={Link}
            style={{ marginLeft: "auto", marginBottom: "12px"}}
            variant="contained"
            color="primary"
            to="/nota/cadastro"
          >
            Emitir nota
          </Button>
          <Table 
            headers={['Número da nota', 'Cliente', 'Status', 'Ações']}
          >
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
          </Table>
      </>
    );
  };
  
  export default ListInvoices;
  