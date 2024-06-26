import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import FileUploader from "./FileUploader";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import { NextButton } from "../styles/NextButton";
import {
  cadastrarUser,
  setSegundoPasso,
} from "../store/features/cadastroSlice";
import { IRegisterSecondStep } from "../interfaces/RegisterInterfaces";
import home_disabled from "../assets/home_disabled_pixelated.png";
import home from "../assets/home_pixelated.png";
import { login } from "../store/features/authSlice";
import { resetRefresh } from "../store/features/estoqueSlice";
const CadastroSegundoPasso = () => {
  const step = useAppSelector((state) => state.register.step);
  const email = useAppSelector((state) => state.register.email) as string;
  const password = useAppSelector((state) => state.register.password) as string;

  const [nome, setNome] = useState("");
  const [altura, setAltura] = useState<number | null>(null);
  const [peso, setPeso] = useState<number | null>(null);
  const [dataNascimento, setDataNascimento] = useState<string | null>(null);
  const [genero, setGenero] = useState<number | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState(false);
  const [isDot, setIsDot] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const second_step: IRegisterSecondStep = {
    nome: nome,
    altura: altura,
    peso: peso,
    data_nascimento: dataNascimento,
    genero: genero,
    profile_pic: images.length != 0 ? images[0] : null,
  };
  const integer_regex = /^[0-9]+(?!\.,)$/;
  const handleCadastro = async () => {
    setLoading(true);
    if (
      nome &&
      altura &&
      peso &&
      dataNascimento &&
      genero != null &&
      step == 2
    ) {
      dispatch(setSegundoPasso(second_step));
      try {
        const result = await dispatch(cadastrarUser()).unwrap();
        await dispatch(login({ email, password })).unwrap();
        await dispatch(resetRefresh());
      } catch (e) {
        setError(true);
      }
    } else {
      setError(true);
    }
    setLoading(false);
  };
  return (
    <Box display={step == 2 ? "inherit" : "none"}>
      <FileUploader images={images} setImages={setImages}></FileUploader>
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
        id="name"
        label="NOME"
        name="name"
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
        value={nome}
        onChange={(e) => {
          setNome(e.target.value);
        }}
        onClick={(e) => setError(false)}
      />
      <Box>
        <Typography sx={{ fontFamily: "VT323", fontSize: 20 }}>SEXO</Typography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={genero}
          name="radio-buttons-group"
          row
          value={genero == 1 ? "masc" : genero == null ? null : "fem"}
          onChange={(e) => {
            e.target.value == "masc" ? setGenero(1) : setGenero(2);
          }}
        >
          <FormControlLabel
            value="fem"
            control={<Radio />}
            label={
              <Typography sx={{ fontFamily: "VT323", fontSize: 20 }}>
                FEM
              </Typography>
            }
          />
          <FormControlLabel
            value="masc"
            control={<Radio />}
            label={
              <Typography sx={{ fontFamily: "VT323", fontSize: 20 }}>
                MASC
              </Typography>
            }
          />
        </RadioGroup>
        <Box>
          {" "}
          <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "50%" }}>
            <Input
              type="date"
              value={dataNascimento ? dataNascimento : ""}
              onKeyDown={(e) => {
                e.key == "." || e.key == ","
                  ? setIsDot((prev) => true)
                  : setIsDot((prev) => false);
              }}
              onChange={(e) => {
                setDataNascimento(e.target.value);
                console.log(dataNascimento);
              }}
              id="standard-adornment-weight"
              sx={{
                "& input:focus": {
                  boxShadow: "none",
                },
                ":after": {
                  borderBottom: "2px solid black",
                  boxShadow: "2.6px 5.3px 3px hsl(0deg 0% 0% / 0.42)",
                },
                "& input[type=number]": {
                  "-moz-appearance": "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
                "& input[type=number]::-webkit-inner-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
              }}
              aria-describedby="standard-weight-helper-text"
              inputProps={{
                style: {
                  fontFamily: "VT323",
                  fontSize: 20,
                  backgroundColor: "rgba(255,255,255,0)",
                  textAlign: "end",
                },
              }}
            />
            <FormHelperText
              sx={{ textAlign: "end", fontFamily: "VT323", fontSize: 15 }}
              id="standard-weight-helper-text"
            >
              DATA NASCIMENTO
            </FormHelperText>
          </FormControl>
        </Box>
        <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "25%" }}>
          <Input
            id="standard-adornment-weight"
            type="number"
            onChange={(e) => {
              setPeso(parseFloat(e.target.value));
            }}
            endAdornment={
              <InputAdornment position="end">
                {" "}
                <span style={{ fontFamily: "VT323" }}>KG</span>
              </InputAdornment>
            }
            sx={{
              "& input:focus": {
                boxShadow: "none",
              },
              ":after": {
                borderBottom: "2px solid black",
                boxShadow: "2.6px 5.3px 3px hsl(0deg 0% 0% / 0.42)",
              },
              "& input[type=number]": {
                "-moz-appearance": "textfield",
              },
              "& input[type=number]::-webkit-outer-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
              },
              "& input[type=number]::-webkit-inner-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
              },
            }}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              style: {
                fontFamily: "VT323",
                fontSize: 20,
                backgroundColor: "rgba(255,255,255,0)",
                textAlign: "end",
              },
            }}
          />
          <FormHelperText
            sx={{ textAlign: "end", fontFamily: "VT323", fontSize: 15 }}
          >
            PESO
          </FormHelperText>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "25%" }}>
          <Input
            id="standard-adornment-weight"
            type="number"
            value={altura ? altura : ""}
            onKeyDown={(e) => {
              e.key == "." || e.key == ","
                ? setIsDot((prev) => true)
                : setIsDot((prev) => false);
            }}
            onChange={(e) => {
              if (e.target.value == "" && isDot) {
                setAltura((prev) => prev);
              }
              if (
                (e.target.value == "" && !isDot) ||
                parseFloat(e.target.value) < 1
              ) {
                setAltura((prev) => null);
              }
              if (integer_regex.test(e.target.value)) {
                setAltura((prev) => parseInt(e.target.value));
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                {" "}
                <span style={{ fontFamily: "VT323" }}>CM</span>
              </InputAdornment>
            }
            sx={{
              "& input:focus": {
                boxShadow: "none",
              },
              ":after": {
                borderBottom: "2px solid black",
                boxShadow: "2.6px 5.3px 3px hsl(0deg 0% 0% / 0.42)",
              },
              "& input[type=number]": {
                "-moz-appearance": "textfield",
              },
              "& input[type=number]::-webkit-outer-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
              },
              "& input[type=number]::-webkit-inner-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
              },
            }}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              style: {
                fontFamily: "VT323",
                fontSize: 20,
                backgroundColor: "rgba(255,255,255,0)",
                textAlign: "end",
              },
            }}
          />
          <FormHelperText
            sx={{ textAlign: "end", fontFamily: "VT323", fontSize: 15 }}
            id="standard-weight-helper-text"
          >
            ALTURA
          </FormHelperText>
        </FormControl>
      </Box>

      <NextButton
        className={error ? "error" : ""}
        disabled={loading || error || nome.length < 1 ? true : false}
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
        onClick={handleCadastro}
      >
        {loading ? (
          <CircularProgress color="success" />
        ) : (
          <img
            src={loading || nome.length < 1 ? home_disabled : home}
            style={{ width: 50, height: 50, borderRadius: 5 }}
          />
        )}
      </NextButton>
    </Box>
  );
};

export default CadastroSegundoPasso;
