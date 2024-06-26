import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
export const LoginButton = styled(Button)(({ theme }) => ({
  "&:active": {
    [theme.breakpoints.up("xs")]: {
      background: "transparent",
      boxShadow: "none",
    },
    [theme.breakpoints.up("md")]: {
      background: "transparent",
      boxShadow: "none",
    },
  },
  "&:active.error": {
    [theme.breakpoints.up("xs")]: {
      background: "transparent",
      boxShadow: "none",
    },
    [theme.breakpoints.up("md")]: {
      background: "transparent",
      boxShadow: "none",
    },
  },
  "&:hover": {
    [theme.breakpoints.up("xs")]: {
      background: "transparent",
      boxShadow: "none",
    },
    [theme.breakpoints.up("md")]: {
      background: "transparent",
      boxShadow: "none",
    },
  },
  "&:hover.error": {
    [theme.breakpoints.up("xs")]: {
      background: "transparent",
      boxShadow: "none",
    },
    [theme.breakpoints.up("md")]: {
      background: "transparent",
      boxShadow: "none",
    },
  },
  "&:disabled": {
    [theme.breakpoints.up("xs")]: {
      background: "transparent",
      boxShadow: "none",
      color: "black",
    },
    [theme.breakpoints.up("md")]: {
      background: "transparent",
      boxShadow: "none",
    },
  },
  "&:focus": {
    [theme.breakpoints.up("xs")]: {
      background: "transparent",
      boxShadow: "none",
    },
    [theme.breakpoints.up("md")]: {
      background: "transparent",
      boxShadow: "none",
    },
  },
}));
