import { createTheme, Theme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

export const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiInput: {
        styleOverrides: {
          root: {
            "&::before": {
              borderBottom: "1px solid black",
            },

            "&.Mui-focused:after": {
              borderBottom: "1px solid black",
            },
            "&:hover": {
              borderBottom: "1px solid black",
            },
          },
        },
      },
    },
  });
