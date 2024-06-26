import { useAppDispatch } from "../store/store";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Alert,
  Grid,
} from "@mui/material";
import Certificate from "../assets/certificate.png";
import CadastroPrimeiroPasso from "../components/CadastroPrimeiroPasso";
import CadastroSegundoPasso from "../components/CadastroSegundoPasso";

const RegistroPage = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);

  const errorMessage = (
    <Box sx={{ width: "90%" }}>
      {error ? (
        <Alert
          severity="error"
          sx={{
            mt: 2,
            fontFamily: "VT323",
            fontSize: 19,
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "rgba(253, 237, 237,0.7)",
          }}
        >
          ERRO NO CADASTRO!
        </Alert>
      ) : (
        <></>
      )}
    </Box>
  );

  return (
    <Box>
      <Container maxWidth="xs" sx={{ position: "relative" }}>
        <CssBaseline />
        <Box
          sx={{
            mt: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 0.5,
            padding: 3,
            boxShadow: "2.6px 5.3px 5.3px hsl(0deg 0% 0% / 0.42)",
            backgroundImage: `url(${Certificate})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            opacity: 1,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "VT323",
              fontSize: 30,
              letterSpacing: 5,
              marginTop: 10,
              paddingLeft: 2,
              paddingRight: 2,
              textShadow: "1px 1px 2px white, 0 0 1em blue, 0 0 0.2em yellow",
              borderRadius: 1.5,
            }}
          >
            CRIAR USUÁRIO
          </Typography>
          {errorMessage}
          <Box sx={{ mt: 1, width: "90%" }}>
            <CadastroPrimeiroPasso />
            <CadastroSegundoPasso />
            <Grid container justifyContent={"flex-end"}>
              <Grid item position={"absolute"} bottom={-35} right={20}>
                <Link
                  to="/login"
                  style={{ textDecorationColor: "white", color: "white" }}
                >
                  <Typography
                    component={"span"}
                    sx={{
                      fontFamily: "VT323",
                      letterSpacing: 1,
                      fontSize: 20,
                      textShadow:
                        "0px 0px 0px white, 0 0 1em green, 0 0 0.2em green",
                    }}
                  >
                    JÁ POSSUI CONTA? CLIQUE AQUI
                  </Typography>
                </Link>{" "}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default RegistroPage;
