import * as React from "react";
import { Box, CssBaseline, BottomNavigation, Paper } from "@mui/material";
import { PieChart, ViewList, Home, Kitchen } from "@mui/icons-material";
import "../main.css";
import { useNavigate } from "react-router-dom";
import { BottomNavigationActionHome } from "../styles/BottomNavigationActionHome";
import { BottomNavigationActionFoods } from "../styles/BottomNavigationActionFoods";
import { BottomNavigationActionMeals } from "../styles/BottomNavigationActionMeals";
import { BottomNavigationActionStatistics } from "../styles/BottomNavigationActionStatistics";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectTab } from "../store/features/authSlice";
export default function FixedBottomNavigation() {
  const navigate = useNavigate();
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
  const tab = useAppSelector((state) => state.auth.tab);
  const ref = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
  }, [tab]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          sx={{
            borderBottomLeftRadius: 2,
            borderBottomRightRadius: 2,
          }}
          style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
          value={tab}
          onChange={(event, newValue) => {
            userProfileInfo ? dispatch(selectTab(newValue)) : null;
          }}
        >
          <BottomNavigationActionHome
            label="HOME"
            icon={<Home />}
            onClick={() => {
              navigate("/");
            }}
          />
          <BottomNavigationActionFoods
            label="ALIMENTOS"
            icon={<Kitchen />}
            onClick={() => {
              navigate("/alimentos");
            }}
          />
          <BottomNavigationActionMeals
            label="REFEIÇÕES"
            icon={<ViewList />}
            onClick={() => {
              navigate("/refeicoes");
            }}
          />
          <BottomNavigationActionStatistics
            label="ESTATÍSTICAS"
            icon={<PieChart />}
            onClick={() => {
              navigate("/estatisticas");
            }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
