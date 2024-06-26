import register from "../assets/register.png";
import { Box, Icon, useTheme } from "@mui/material";

const RegisterIcon = () => {
  const theme = useTheme();
  return (
    <Icon
      sx={{
        width: { xs: 65, md: 65 },
        height: { xs: 65, md: 65 },
        display: "flex",
      }}
    >
      <Box component="img" alt="An register icon." src={register} />
    </Icon>
  );
};

export default RegisterIcon;
