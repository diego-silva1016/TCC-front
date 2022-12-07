import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useAuth } from "../contexts/LoginContext";
import { useNavigate } from "react-router-dom";

import { LinkButton, Main } from "./index.style";

const Template = ({ component, dontShowHeader = false }) => {
  const url = window.location.href;
  const navigate = useNavigate()

  const { company, logout } = useAuth();

  const signOut = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, height: "60px" }}>
        <AppBar position="static">
          <Toolbar sx={{ backgroundColor: "#505050" }}>
            {!dontShowHeader && (
              <>
                <LinkButton active={url.includes("nota")} to="/nota">
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Notas
                  </Typography>
                </LinkButton>
                <LinkButton active={url.includes("cliente")} to="/cliente">
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Clientes
                  </Typography>
                </LinkButton>
                <LinkButton active={url.includes("servico")} to="/servico">
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Serviços
                  </Typography>
                </LinkButton>
                {!company.vinculouCertificado && (
                  <LinkButton
                    active={url.includes("vincular-certificado")}
                    to="/vincular-certificado"
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      Vincular certificado
                    </Typography>
                  </LinkButton>
                )}
              </>
            )}
            {!dontShowHeader &&
             <Button style={{marginLeft: 'auto'}} onClick={signOut}><Logout style={{color: '#fff'}}/></Button>
            }
          </Toolbar>
         
        </AppBar>
      </Box>
      <Main>{component}</Main>
    </>
  );
};

export default Template;
