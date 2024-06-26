import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
export const TextFieldStyled = styled(TextField)(({ theme }) => ({
  border: "1px solid black",

  "& fieldset": { border: 0.1 },
  "& input:focus": {
    boxShadow: "2.6px 5.3px 5.3px hsl(0deg 0% 0% / 0.42)",
    border: "1px solid black",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },

    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
      border: 1,
    },
  },
}));
