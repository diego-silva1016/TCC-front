import { TextField, Button } from "@mui/material";
import { Main, H2 } from "./index.style";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/LoginContext";

const SendCertificate = () => {
    const navigate = useNavigate()
    const { setCertificate } = useAuth()

    const sendCertificate = async () => {
        try{
            await setCertificate()

            navigate('/nota')
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <Main>
            <H2>Vincular certificado digital</H2>

            <div>
                <TextField
                    //label="Certificado digital"
                    type="file"
                    variant="outlined"
                    margin="normal"
                    //value={service.codigo}
                    //onChange={(e) => atualizarService(e.target.value, "codigo")}
                    sx={{ width: "20%", marginRight: "2.5%", backgroundColor: "white", borderRadius: "4px" }}
                />
                <TextField
                    label="Senha do certificado"
                    type="text"
                    variant="outlined"
                    margin="normal"
                    //value={service.descricao}
                    //onChange={(e) => atualizarService(e.target.value, "descricao")}
                    sx={{ width: "77.5%", backgroundColor: "white", borderRadius: "4px" }}
                />
            </div>
            <div style={{ marginLeft: "auto", marginTop: "4px" }}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={sendCertificate}
                >
                    Enviar
                </Button>
            </div>
    </Main >
  );
};

export default SendCertificate;
