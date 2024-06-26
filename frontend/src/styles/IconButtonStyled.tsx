import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";

export const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  "&:active, :hover, &:focus": {
    boxShadow: "none",
    background: "none",
  },
}));
