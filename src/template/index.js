import {
  AppBar,
  Box,
  Toolbar,
  Typography
} from "@mui/material";

import { LinkButton, Main } from "./index.style";


const Template = ({ component }) => {
  const url = window.location.href

  return (
    <>
      <Box sx={{ flexGrow: 1, height: '60px' }}>
        <AppBar position="static">
          <Toolbar sx={{backgroundColor: '#505050'}}>
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
      <Main>
      {component}
      </Main>
    </>
  );
};

export default Template;
