import { TableRow, TableCell, Button, Modal, Box } from "@mui/material";

import Table from "../../components/Table";

import { Visibility } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/LoginContext";
import EmptyMessage from "../../components/EmptyMessage";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: "1px solid #a3a3a3",
  borderRadius: "4px",
  p: 4,
  display: 'flex',
  flexDirection: 'column'
};

const ListInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { company } = useAuth();

  const getInvoices = useCallback(() => {
    axios
      .get(`http://localhost:3333/invoice`)
      .then(({ data }) => setInvoices(data));
  }, []);

  useEffect(() => getInvoices(), [getInvoices]);

  function formataDocumento(documento) {
    documento = documento.replace(/[^\d]/g, "");
    if (documento.length <= 11) {
      return documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    return documento.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }

  return (
    <>
      {company.vinculouCertificado ? (
        <Button
          component={Link}
          style={{ marginLeft: "auto", marginBottom: "12px" }}
          variant="contained"
          color="primary"
          to="/nota/cadastro"
        >
          Emitir nota
        </Button>
      ) : (
        <Button
          style={{ marginLeft: "auto", marginBottom: "12px" }}
          variant="contained"
          color="primary"
          onClick={() => setIsOpen(true)}
        >
          Emitir nota
        </Button>
      )}

      <Table headers={["Número da nota", "Cliente", "Serviço", "Status", "Data de emissão", "Ações"]}>
        {invoices.sort((a, b) => new Date(b.dataEmissao) - new Date(a.dataEmissao)).map((invoice) => (
          <TableRow
            key={invoice.nfeId}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="center">{invoice.codigoNota}</TableCell>
            <TableCell align="center">{invoice.clientName} - {formataDocumento(invoice.documento)}</TableCell>
            <TableCell align="center">{invoice.descricaoServico}</TableCell>
            <TableCell align="center">{invoice.status}</TableCell>
            <TableCell align="center">{new Date(invoice.dataEmissao).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
            })}</TableCell>
            <TableCell align="center">
              <Link to={`/nota/${invoice.nfeId}`}>
                <Visibility style={{ color: "#a3a3a3" }} />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </Table>
      {!invoices.length && <EmptyMessage message="Nenhuma nota foi emitida." />}
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 style={{ marginBottom: '20px' }}>Vincular certificado</h2>
          <p id="parent-modal-description">
            Você deve vincular um certificado digital à sua empresa para emitir nota.
          </p>
          <Button
            component={Link}
            style={{ marginLeft: "auto", marginTop: "12px" }}
            variant="contained"
            color="primary"
            to="/vincular-certificado"
          >
            Ir para vincular certificado
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ListInvoices;
