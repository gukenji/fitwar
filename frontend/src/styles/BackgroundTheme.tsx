import { Box } from "@mui/material";
import BackgroundImage from "../assets/Summer1.png";

const BackgroundTheme = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        height: "100vh",
        width: "100vw",
        backgroundSize: "cover",
        position: "fixed",
        backgroundAttachment: "fixed",
        flexGrow: 1,
        opacity: 0.8,
        zIndex: -1,
      }}
    ></Box>
  );
};

export default BackgroundTheme;
