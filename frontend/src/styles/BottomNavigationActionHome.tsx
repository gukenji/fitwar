import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { styled } from "@mui/material/styles";

export const BottomNavigationActionHome = styled(BottomNavigationAction)(
  ({ theme }) => ({
    // "&:focus": {
    //   boxShadow:
    //   "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
    // },
    "&:hover": {
      boxShadow: "0 0 0 3px var(--color-light), 0 0 0 4px var(--color)",
      background: "#422445",
      color: "white",
    },
    "&.MuiButtonBase-root.Mui-selected": {
      boxShadow: "0 0 0 3px var(--color-light), 0 0 0 4px var(--color)",

      [theme.breakpoints.up("xs")]: {
        background: "#422445",
      },
      [theme.breakpoints.up("md")]: {
        background: "#422445",
      },
    },
    "&.MuiButtonBase-root.Mui-selected , &.MuiSvgIcon-root": {
      [theme.breakpoints.up("xs")]: {
        color: "white",
      },
      [theme.breakpoints.up("md")]: {
        color: "white",
      },
    },
    "& .MuiBottomNavigationAction-label.Mui-selected": {
      [theme.breakpoints.up("xs")]: {
        fontSize: "1.2rem",
        color: "white",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "1.5rem",
        color: "white",
      },
    },
    "& .MuiBottomNavigationAction-label": {
      [theme.breakpoints.up("xs")]: {
        fontSize: "1rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "1.2rem",
      },
    },
  })
);
