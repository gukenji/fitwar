import * as React from "react";
import { useEffect } from "react";
import {
  Accordion,
  AccordionSlots,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Radio,
  RadioGroup,
  Fade,
  Button,
  Box,
  TextField,
  styled,
  FormControlLabel,
  FormLabel,
  Tooltip,
  IconButton,
  Alert,
  ClickAwayListener,
} from "@mui/material";
import { AccordionSummaryStyled } from "../styles/AccordionSummaryStyled";
import { ExpandMore, Backup, Info } from "@mui/icons-material";
import { createAlimento } from "../store/features/alimentosSlice";
import { IAlimento } from "../interfaces/FoodInterfaces";
import AlertInput from "./AlertInput";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useState, useRef } from "react";

export default function CadastrarAlimento() {
  const [formResult, setFormResult] = useState<boolean | null>(null);
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [brand, setBrand] = useState<string | null>("");
  const [name, setName] = useState<string>("");
  const [portionSize, setPortionSize] = useState<number | string>("");
  const [isCustomPortion, setIsCustomPortion] = useState<boolean>(false);
  const [portionDescription, setPortionDescription] = useState<string | null>(
    ""
  );
  const [kcal, setKcal] = useState<number | string>("");
  const [protein, setProtein] = useState<number | string>("");
  const [carbs, setCarbs] = useState<number | string>("");
  const [fat, setFat] = useState<number | string>("");
  const access_token = useAppSelector((state) => state.auth.tokenInfo?.access);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSucesssMessage] = useState("");
  const formRef = useRef<HTMLFormElement>();
  const dispatch = useAppDispatch();
  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const handleCustomPortion = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selection = event.target.value;
    selection == "false" ? setIsCustomPortion(false) : setIsCustomPortion(true);
  };
  const clearForm = () => {
    setBrand((prev) => "");
    setName((prev) => "");
    setPortionSize((prev) => "");
    setIsCustomPortion((prev) => false);
    setPortionDescription((prev) => "");
    setKcal((prev) => "");
    setProtein((prev) => "");
    setCarbs((prev) => "");
    setFat((prev) => "");
    formRef.current != undefined ? formRef.current.reset() : null;
  };

  const handleCreateFood = async () => {
    try {
      const food: IAlimento = {
        marca: brand,
        nome: name,
        peso_referencia: portionSize,
        porcao_customizada: isCustomPortion,
        descricao_porcao: portionDescription,
        calorias: kcal,
        proteinas: protein,
        carboidratos: carbs,
        gorduras: fat,
        token: access_token,
        codigo_barra: null,
      };
      await dispatch(createAlimento(food)).unwrap();
      setFormResult(true);
      setSucesssMessage("ALIMENTO ENVIADO PARA O BANCO DE DADOS COM SUCESSO!");
      clearForm();
    } catch (e) {
      setFormResult(false);
      setErrorMessage("ERRO AO CADASTRAR ALIMENTO");
    }
  };
  const toolTipText = (
    <Typography sx={{ fontFamily: "VT323" }}>
      O ALIMENTO CADASTRADO SERÁ INSERIDO NO BANCO DE DADOS. <br />
      DESSA FORMA QUALQUER PESSOA QUE QUISER INCLUIR ALGUM ALIMENTO EM SUA
      GELADEIRA OU EM SUA REFEIÇÃO POSTERIORMENTE PODERÁ UTILIZAR ESTE ALIMENTO
      CADASTRADO.
    </Typography>
  );
  const TypographyStyled = styled(Typography)(({ theme }) => ({
    position: "relative",
    textDecoration: "none",
    "&:before": {
      content: expanded ? "''" : null,
      position: expanded ? "absolute" : "relative",
      display: "block",
      background: "black",
      width: "100%",
      height: "2px",
      bottom: 0,
      left: 0,
      transform: expanded ? "scaleX(1) " : "scaleX(0)",
    },
  }));
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormResult(null);
    }, 6000);
    return () => clearTimeout(timer);
  }, [formResult, dispatch]);

  return (
    <>
      <Accordion
        expanded={expanded}
        slots={{ transition: Fade as AccordionSlots["transition"] }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={{
          boxShadow: "2.6px 5.3px 5.3px hsl(0deg 0% 0% / 0.42)",
          borderRadiusTop: 0.5,
          "& .MuiAccordion-region": { height: expanded ? "auto" : 0 },
          "& .MuiAccordionDetails-root": {
            display: expanded ? "block" : "none",
          },
        }}
      >
        <AccordionSummaryStyled
          expandIcon={<ExpandMore onClick={handleExpansion} />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ maxHeight: 64, minHeight: 30 }}
        >
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              placement="bottom-start"
              title={toolTipText}
              arrow
            >
              <IconButton onClick={handleTooltipOpen}>
                <Info />
              </IconButton>
            </Tooltip>
          </ClickAwayListener>
          <TypographyStyled
            sx={{ fontFamily: "VT323", fontSize: { xs: 25, md: 35 } }}
          >
            CADASTRAR ALIMENTO{" "}
          </TypographyStyled>
        </AccordionSummaryStyled>
        <AccordionDetails>
          <Box
            component="form"
            noValidate
            ref={formRef}
            autoComplete="off"
            sx={{ display: "flex", flexDirection: "column", p: 1 }}
            onChange={() => setFormResult(null)}
          >
            {formResult !== null ? (
              <AlertInput
                result={formResult}
                successMessage={successMessage}
                errorMessage={errorMessage}
              />
            ) : null}
            <TextField
              fullWidth
              id="brand"
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
              label="MARCA"
              value={brand}
              inputProps={{ style: { fontFamily: "VT323", fontSize: 20 } }}
              variant="standard"
              onChange={(e) => {
                setBrand(e.target.value.toUpperCase());
              }}
            />
            <TextField
              fullWidth
              id="name"
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
              label="ALIMENTO"
              FormHelperTextProps={{
                sx: { color: "red", fontFamily: "VT323" },
              }}
              helperText={
                !name && formResult == false ? "PREENCHIMENTO NECESSÁRIO" : null
              }
              inputProps={{ style: { fontFamily: "VT323", fontSize: 20 } }}
              required
              value={name}
              variant="standard"
              onChange={(e) => {
                setName(e.target.value.toUpperCase());
              }}
            />
            <div style={{ paddingTop: 20 }}>
              <FormLabel
                id="demo-controlled-radio-buttons-group"
                sx={{ fontFamily: "VT323" }}
              >
                PORÇÃO CUSTOMIZADA? (ex.: 1 fatia)
              </FormLabel>

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={isCustomPortion}
                onChange={handleCustomPortion}
                sx={{ mb: 0 }}
              >
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label={<Typography fontFamily={"VT323"}>NÃO</Typography>}
                />
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label={<Typography fontFamily={"VT323"}>SIM</Typography>}
                />
              </RadioGroup>
            </div>{" "}
            <TextField
              fullWidth
              id="custom_portion"
              InputLabelProps={{
                sx: {
                  fontFamily: "VT323",
                  fontSize: 20,
                  display: isCustomPortion ? "inherit" : "none",
                },
              }}
              required={isCustomPortion}
              label="DESCRIÇÃO"
              helperText={
                <span
                  style={{
                    display: isCustomPortion ? "flex" : "none",
                    flexDirection: "column",
                    marginTop: 0,
                    marginBottom: 10,
                  }}
                >
                  <span style={{ margin: 0, padding: 0 }}>ex.: 1 fatia</span>
                  {isCustomPortion &&
                  !portionDescription &&
                  formResult == false ? (
                    <span style={{ margin: 0, padding: 0, color: "red" }}>
                      PREENCHIMENTO NECESSÁRIO
                    </span>
                  ) : null}
                </span>
              }
              FormHelperTextProps={{
                sx: { fontFamily: "VT323" },
              }}
              inputProps={{
                style: {
                  fontFamily: "VT323",
                  fontSize: 20,
                  display: isCustomPortion ? "inherit" : "none",
                },
              }}
              onChange={(e) => {
                setPortionDescription(e.target.value.toUpperCase());
              }}
              value={portionDescription}
              variant="standard"
            />
            <TextField
              fullWidth
              required
              type="number"
              id="portion_size"
              value={portionSize}
              FormHelperTextProps={{
                sx: { color: "red", fontFamily: "VT323" },
              }}
              helperText={
                !portionSize && formResult == false
                  ? "PREENCHIMENTO NECESSÁRIO"
                  : null
              }
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
              label="PORÇÃO (GR)"
              inputProps={{
                min: 0,
                style: { fontFamily: "VT323", fontSize: 20 },
              }}
              variant="standard"
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setPortionSize((prev) => (value >= 1 ? value : NaN));
              }}
            />
            <TextField
              fullWidth
              required
              type="number"
              id="kcal"
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
              label="CALORIAS (KCAL)"
              inputProps={{
                min: 0,
                style: { fontFamily: "VT323", fontSize: 20 },
              }}
              variant="standard"
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setKcal((prev) => (value >= 0 ? value : NaN));
              }}
              FormHelperTextProps={{
                sx: { color: "red", fontFamily: "VT323" },
              }}
              helperText={
                !kcal && formResult == false ? "PREENCHIMENTO NECESSÁRIO" : null
              }
              value={kcal}
            />
            <TextField
              fullWidth
              required
              type="number"
              id="protein"
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
              label="PROTEÍNAS (GR)"
              FormHelperTextProps={{
                sx: { color: "red", fontFamily: "VT323" },
              }}
              helperText={
                !protein && formResult == false
                  ? "PREENCHIMENTO NECESSÁRIO"
                  : null
              }
              inputProps={{
                min: 0,
                style: { fontFamily: "VT323", fontSize: 20 },
              }}
              variant="standard"
              value={protein}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setProtein((prev) => (value >= 0 ? value : NaN));
              }}
            />
            <TextField
              fullWidth
              required
              type="number"
              value={carbs}
              id="carbs"
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
              label="CARBOÍDRATOS (GR)"
              inputProps={{
                min: 0,
                style: { fontFamily: "VT323", fontSize: 20 },
              }}
              FormHelperTextProps={{
                sx: { color: "red", fontFamily: "VT323" },
              }}
              helperText={
                !carbs && formResult == false
                  ? "PREENCHIMENTO NECESSÁRIO"
                  : null
              }
              variant="standard"
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setCarbs((prev) => (value >= 0 ? value : NaN));
              }}
            />
            <TextField
              fullWidth
              required
              type="number"
              id="fat"
              value={fat}
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
              label="GORDURA (GR)"
              inputProps={{
                style: { fontFamily: "VT323", fontSize: 20 },
              }}
              FormHelperTextProps={{
                sx: { color: "red", fontFamily: "VT323" },
              }}
              helperText={
                !fat && formResult == false ? "PREENCHIMENTO NECESSÁRIO" : null
              }
              variant="standard"
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setFat((prev) => (value >= 0 ? value : NaN));
              }}
            />
            <Button
              sx={{ fontFamily: "VT323", margin: "0 auto", fontSize: 22 }}
              onClick={handleCreateFood}
            >
              CADASTRAR
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
