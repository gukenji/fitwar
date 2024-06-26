import padlock from "../assets/padlock.png";
import { Box, Icon, useMediaQuery, useTheme } from "@mui/material";

const PadlockIcon = () => {
  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Icon
      sx={{
        width: { xs: 65, md: 65 },
        height: { xs: 65, md: 65 },
        display: "flex",
      }}
    >
      <Box component="img" alt="An padlock icon." src={padlock} />
    </Icon>
  );
};

export default PadlockIcon;
