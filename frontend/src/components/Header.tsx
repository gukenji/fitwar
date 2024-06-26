import { useAppSelector, useAppDispatch } from "../store/store";
import kcal_pic from "../assets/kcal.png";
import level_pic from "../assets/level.png";
import Avatar from "./Avatar";
import {
  Box,
  styled,
  Container,
  Toolbar,
  AppBar,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from "@mui/material";
import rg from "../assets/rg_pixelated2.png";
import { useEffect, useRef, useState } from "react";
export default function Header() {
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
  const consumed_kcal = 0;
  const box = useRef<HTMLDivElement>();
  const [width, setWidth] = useState<number | null>(0);
  const [height, setHeight] = useState<number | null>(0);
  const rg_ref = useRef<HTMLImageElement | null>(null);
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 15,
    borderRadius: 10,
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 300 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  useEffect(() => {
    if (box.current) {
      box.current.style.width = `${width}px`;
      box.current.style.height = `${height}px`;
    }
  }, [height, width]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flex: 1,
      }}
      onLoad={(e) => {
        if (rg_ref.current) {
          setWidth(rg_ref.current.getBoundingClientRect().width);
          setHeight(rg_ref.current.getBoundingClientRect().height);
        }
      }}
    >
      <img
        src={rg}
        ref={rg_ref}
        style={{
          maxWidth: "100%",
          border: "3px",
          borderColor: "white",
          borderStyle: "solid",
          borderRadius: 5,
          opacity: 0.7,
          boxShadow: "2.6px 5.3px 5.3px hsl(0deg 0% 0% / 0.42)",
          display: userProfileInfo ? "inherit" : "none",
          height: "auto",
          padding: 0,
          margin: 0,
          position: "absolute",
        }}
      ></img>
      <Box
        ref={box}
        display={userProfileInfo ? "flex" : "none"}
        sx={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          width: `${width}px`,
          height: `${height}px`,
          padding: 0,
          margin: 0,
        }}
      >
        <AppBar
          sx={{
            bgcolor: "transparent",
            borderRadius: 5,
            boxShadow: "none",
            zIndex: 10,
            position: "relative",
            display: "flex",
            marginTop: 5,
          }}
        >
          <Toolbar>
            <Avatar />
            {userProfileInfo && (
              <div
                style={{
                  display: "flex",
                  padding: 0,
                  margin: 0,
                  flex: 1,
                  marginTop: 5,
                }}
              >
                {userProfileInfo ? (
                  <Container
                    style={{ padding: 0.5, margin: 0.5, marginTop: 12 }}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.4,
                    }}
                  >
                    <Container style={{ padding: 0.5, margin: 0.5 }}>
                      <Typography
                        sx={{
                          color: "black",
                          fontFamily: "VT323",
                          fontSize: 20,
                          display: "flex",
                          lineHeight: 1.2,
                          flexDirection: "column",
                          letterSpacing: 1,
                          marginBottom: 1,
                        }}
                      >
                        <span>{userProfileInfo.nome.toUpperCase()}</span>
                      </Typography>
                      <BorderLinearProgress
                        variant="determinate"
                        value={
                          (consumed_kcal / userProfileInfo.taxa_metabolica) *
                          100
                        }
                      />
                      <Typography
                        sx={{
                          color: "black",
                          fontFamily: "VT323",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          style={{
                            color: "black",
                            fontSize: 16,
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <img src={kcal_pic} width={12} height={14} />
                          {consumed_kcal}/{userProfileInfo.taxa_metabolica}
                        </span>
                        <span
                          style={{
                            color: "black",
                            fontSize: 16,
                          }}
                        >
                          ENERGIA
                        </span>
                      </Typography>
                    </Container>
                    <Container style={{ padding: 0, margin: 0 }}>
                      <BorderLinearProgress
                        variant="determinate"
                        value={
                          (consumed_kcal / userProfileInfo.taxa_metabolica) *
                          100
                        }
                      />
                      <Typography
                        sx={{
                          color: "black",
                          fontFamily: "VT323",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          style={{
                            color: "black",
                            fontSize: 16,
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <img src={level_pic} width={12} height={14} />
                          {consumed_kcal}/{userProfileInfo.taxa_metabolica}
                        </span>
                        <span
                          style={{
                            color: "black",
                            fontSize: 16,
                          }}
                        >
                          EXP
                        </span>
                      </Typography>
                    </Container>
                  </Container>
                ) : (
                  <></>
                )}
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
}
