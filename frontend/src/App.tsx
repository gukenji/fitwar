import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import SobrePage from "./pages/SobrePage";
import RegistroPage from "./pages/RegistroPage";
import DefaultRoute from "./utils/DefaultRoute";
import Bottom from "./components/Bottom";
import AlimentosPage from "./pages/AlimentosPage";
import RefeicoesPage from "./pages/RefeicoesPage";
import EstatisticasPage from "./pages/EstatisticasPage";
import { Box, Container } from "@mui/material";
import BackgroundTheme from "./styles/BackgroundTheme";

function App() {
  return (
    <div style={{ fontFamily: "VT323" }}>
      <Box>
        <Router>
          <BackgroundTheme />
          <Header />
          <Container sx={{ mt: 5 }}>
            <Routes>
              <Route element={<DefaultRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cadastrar" element={<RegistroPage />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/alimentos" element={<AlimentosPage />} />
                <Route path="/refeicoes" element={<RefeicoesPage />} />
                <Route path="/estatisticas" element={<EstatisticasPage />} />
              </Route>
              <Route path="/" element={<SobrePage />} />
            </Routes>
          </Container>
          <Bottom />
        </Router>
      </Box>
    </div>
  );
}

export default App;
