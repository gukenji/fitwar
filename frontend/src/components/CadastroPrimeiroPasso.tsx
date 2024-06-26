import {
  Box,
  CircularProgress,
  FormHelperText,
  TextField,
} from "@mui/material";
import { NextButton } from "../styles/NextButton";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import next from "../assets/next_pixelated.png";
import next_disabled from "../assets/next_disabled_pixelated.png";
import { getUser } from "../store/features/authSlice";
import { setPrimeiroPasso } from "../store/features/cadastroSlice";

const CadastroPrimeiroPasso = () => {
  const step = useAppSelector((state) => state.register.step);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(false);
  const [userExist, setUserExist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState("");
  const first_step = {
    email: email,
    password: password,
    password_confirmation: passwordConfirmation,
  };

  const validarEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const emailHelperText = (
    <FormHelperText
      id="standard-weight-helper-text"
      sx={{ color: "red", fontFamily: "VT323", fontSize: 17 }}
    >
      {emailError !== "" ? emailError : null}
    </FormHelperText>
  );

  const handleNextStep = async () => {
    setLoading(true);
    setEmailError("");
    setUserExist(null);
    const isEmailCorrect = validarEmail(email);
    !isEmailCorrect ? setEmailError("EMAIL INVÁLIDO") : null;
    if (
      email &&
      password &&
      passwordConfirmation == password &&
      step == 1 &&
      isEmailCorrect
    ) {
      try {
        const result = await dispatch(getUser({ email })).unwrap();
        setUserExist((prev) => result);
      } catch (e) {
        setError(true);
      }
    } else {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userExist !== null) {
      userExist
        ? setEmailError("EMAIL JÁ CADASTRADO!")
        : dispatch(setPrimeiroPasso(first_step));
    }
  }, [userExist]);

  useEffect(() => {
    password != passwordConfirmation &&
    password.length > 0 &&
    passwordConfirmation.length > 0
      ? setPasswordConfirmationError("SENHAS NÃO COINCIDEM")
      : setPasswordConfirmationError("");
  }, [password, passwordConfirmation]);

  return (
    <Box display={step == 1 ? "inherit" : "none"}>
      <TextField
        margin="normal"
        required
        inputProps={{
          style: {
            fontFamily: "VT323",
            fontSize: 20,
            backgroundColor: "rgba(255,255,255,0)",
          },
        }}
        InputLabelProps={{
          style: {
            fontFamily: "VT323",
            fontSize: 20,
            color: "rgba(0, 0, 0, 0.87)",
          },
        }}
        fullWidth
        id="email"
        label="EMAIL"
        name="email"
        sx={{
          "& fieldset": { border: 0.1 },
          "& input:focus": {
            boxShadow: "2.6px 5.3px 5.3px hsl(0deg 0% 0% / 0.42)",
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
        }}
        autoFocus
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        onClick={(e) => setEmailError("")}
      />
      {emailHelperText}
      <TextField
        margin="normal"
        required
        fullWidth
        inputProps={{
          style: {
            fontFamily: "VT323",
            fontSize: 20,
            backgroundColor: "rgba(255,255,255,0)",
          },
        }}
        InputLabelProps={{
          style: {
            fontFamily: "VT323",
            fontSize: 20,
            color: "rgba(0, 0, 0, 0.87)",
          },
        }}
        id="password"
        name="password"
        label="SENHA"
        type="password"
        value={password}
        sx={{
          "& fieldset": { border: 0.1 },
          "& input:focus": {
            boxShadow: "2.6px 5.3px 5.3px hsl(0deg 0% 0% / 0.42)",
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
        }}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onClick={(e) => setError(false)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        inputProps={{
          style: {
            fontFamily: "VT323",
            fontSize: 20,
            backgroundColor: "rgba(255,255,255,0)",
          },
        }}
        InputLabelProps={{
          style: {
            fontFamily: "VT323",
            fontSize: 20,
            color: "rgba(0, 0, 0, 0.87)",
          },
        }}
        id="password_confirmation"
        name="password_confirmation"
        label="CONFIRME A SENHA"
        type="password"
        sx={{
          "& fieldset": { border: 0.1 },
          "& input:focus": {
            boxShadow: "2.6px 5.3px 5.3px hsl(0deg 0% 0% / 0.42)",
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
        }}
        value={passwordConfirmation}
        onChange={(e) => {
          setPasswordConfirmation(e.target.value);
        }}
        onClick={(e) => setError(false)}
      />
      <FormHelperText
        id="standard-weight-helper-text"
        sx={{ color: "red", fontFamily: "VT323", fontSize: 17 }}
      >
        {passwordConfirmationError}
      </FormHelperText>

      <NextButton
        className={error ? "error" : ""}
        disabled={
          loading ||
          error ||
          password.length < 1 ||
          email.length < 1 ||
          passwordConfirmation != password
            ? true
            : false
        }
        variant="contained"
        sx={{
          mb: 2,
          padding: 0,
          float: "right",
          fontFamily: "VT323",
          background: !error ? "none" : "none",
          border: "none",
          boxShadow: "none",
          justifyContent: "flex-end",
        }}
        onClick={handleNextStep}
      >
        {loading ? (
          <CircularProgress color="success" />
        ) : (
          <img
            src={
              loading ||
              password.length < 1 ||
              email.length < 1 ||
              passwordConfirmation != password
                ? next_disabled
                : next
            }
            style={{ width: 50, height: 50, borderRadius: 5 }}
          />
        )}
      </NextButton>
    </Box>
  );
};

export default CadastroPrimeiroPasso;
