import { Alert, Box } from "@mui/material";
const AlertInput = ({
  result,
  successMessage,
  errorMessage,
}: {
  result: boolean | null;
  successMessage: string;
  errorMessage: string;
}) => {
  return (
    <Box sx={{ "&.MuiPaper-root": { justifyContent: "center" } }}>
      {result ? (
        <Alert
          severity="success"
          sx={{
            mt: 2,
            fontFamily: "VT323",
            fontSize: 15,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {successMessage}
        </Alert>
      ) : result == false ? (
        <Alert
          severity="error"
          sx={{ mt: 2, fontFamily: "VT323", fontSize: 15, textAlign: "center" }}
        >
          {errorMessage}
        </Alert>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default AlertInput;
