import {
  AppBar,
  Box,
  Toolbar,
  Typography
} from "@mui/material";

import { LinkButton } from "./index.style";


const Template = ({ component }) => {
  const url = window.location.href

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <LinkButton active={url.includes('nota')} to="/nota">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Notas
              </Typography>
            </LinkButton>
            <LinkButton active={url.includes('cliente')} to="/cliente">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Clientes
              </Typography>
            </LinkButton>
            <LinkButton active={url.includes('servico')} to="/servico">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Serviços
              </Typography>
            </LinkButton>
          </Toolbar>
        </AppBar>
      </Box>
      {component}
    </>
  );
};

export default Template;
