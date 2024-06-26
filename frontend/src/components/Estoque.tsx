import React, { useState } from "react";
import MyInventory from "./EstoqueCadastrados";
import SearchFood from "./BuscarAlimento";
import IncludeToInventory from "./EstoqueIncluir";
import { useAppSelector, useAppDispatch } from "../store/store";
import { useEffect } from "react";
import { Info, ExpandMore } from "@mui/icons-material";
import { eraseSucessAlert } from "../store/features/estoqueSlice";
import { AccordionSummaryStyled } from "../styles/AccordionSummaryStyled";
import {
  Box,
  styled,
  ClickAwayListener,
  Fade,
  Accordion,
  Tooltip,
  Tab,
  AccordionSlots,
  AccordionSummary,
  Typography,
  IconButton,
} from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import AlertInput from "./AlertInput";
import EstoqueResumo from "./EstoqueResumo";

const Estoque = () => {
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState("1");
  const dispatch = useAppDispatch();
  const success = useAppSelector((state) => state.inventory.success);
  const message_tab = useAppSelector((state) => state.inventory.tab);
  const request_type = useAppSelector((state) => state.inventory.request_type);
  const success_message = useAppSelector(
    (state) => state.inventory.success_message
  );
  const error_message = useAppSelector(
    (state) => state.inventory.error_message
  );
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const toolTipText = (
    <Typography sx={{ fontFamily: "VT323" }}>
      CADASTRE, EDITE E UTILIZE ALIMENTOS QUE VOCÊ POSSUI EM SUA
      DESPENSA/GELADEIRA. <br />
      AO CADASTRAR VOCÊ TERÁ UMA VISÃO FACILITADA DOS ALIMENTOS QUE PODERÁ
      CONSUMIR E UMA VISÃO MACRO DOS NUTRIENTES DISPONÍVEIS.
    </Typography>
  );

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

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

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(eraseSucessAlert());
    }, 6000);
    return () => clearTimeout(timer);
  }, [success, dispatch]);

  return (
    <Accordion
      expanded={expanded}
      slots={{ transition: Fade as AccordionSlots["transition"] }}
      slotProps={{ transition: { timeout: 400 } }}
      sx={{
        boxShadow: "2.6px 5.3px 5.3px hsl(0deg 0% 0% / 0.42)",

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
          MEU ESTOQUE
        </TypographyStyled>
      </AccordionSummaryStyled>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            TabIndicatorProps={{ style: { background: "#F48925" } }}
          >
            <Tab
              label="INCLUIR"
              value="1"
              sx={{ fontFamily: "VT323", fontSize: 20 }}
            />
            <Tab
              label="CADASTRADOS"
              value="2"
              sx={{ fontFamily: "VT323", fontSize: 20 }}
            />
            <Tab
              label="RESUMO"
              value="3"
              sx={{ fontFamily: "VT323", fontSize: 20 }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          {(request_type == "POST" || request_type == "UPDATE") &&
          message_tab == "INCLUDE" ? (
            <AlertInput
              result={success}
              successMessage={success_message}
              errorMessage={error_message}
            />
          ) : null}
          <SearchFood />
          <IncludeToInventory />
        </TabPanel>
        <TabPanel value="2">
          <EstoqueResumo />
        </TabPanel>
        <TabPanel value="3">
          <EstoqueResumo />
        </TabPanel>
      </TabContext>
    </Accordion>
  );
};

export default Estoque;
