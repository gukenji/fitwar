import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { getFoods } from "../store/features/alimentosSlice";
import Box from "@mui/material/Box";
import { ExpandMore, Info, AddCircle } from "@mui/icons-material";
import {
  Accordion,
  Fade,
  AccordionSlots,
  ClickAwayListener,
  Tooltip,
  IconButton,
  AccordionDetails,
  Avatar,
  FormHelperText,
  TextField,
  Button,
  Typography,
  styled,
} from "@mui/material";
import { ICreateMeal } from "../interfaces/MealsInterfaces";
import {
  setOpenIcon,
  createMeal,
  getMeals,
} from "../store/features/mealsSlice";
import { AccordionSummaryStyled } from "../styles/AccordionSummaryStyled";
import SelectMealIcon from "./SelectMealIcon";
const MyMeals = () => {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);
  const meals_list = useAppSelector((state) => state.meals.meal_list);
  const isRefreshed = useAppSelector((state) => state.meals.refreshed);

  const [open, setOpen] = useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        await dispatch(getMeals()).unwrap();
      } catch (e) {
        console.error(e);
      }
    };
    !isRefreshed ? fetchMeals() : null;
  }, [isRefreshed, dispatch]);

  console.log(meals_list);
  const toolTipText = (
    <Typography sx={{ fontFamily: "VT323" }}>
      LISTA CONTENDO TODAS AS SUAS REFEIÇÕES PREVIAMENTE CADASTRADAS.
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
  return (
    <>
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
            MINHAS REFEIÇÕES
          </TypographyStyled>
        </AccordionSummaryStyled>
        <AccordionDetails>
          {meals_list
            ? meals_list.map((meal) => {
                return (
                  <Box
                    sx={{
                      p: 1,
                      display: "flex",
                      flexWrap: "wrap",
                      flexBasis: "100%",
                      margin: 1,
                      gap: 1,
                      borderRadius: 2,
                      border: 1,
                      justifyContent: "left",
                    }}
                  >
                    <Avatar
                      alt="Dinner Icon"
                      src={meal?.icon}
                      variant="square"
                      sx={{ width: "30px", height: "30px" }}
                    />
                    <Typography>{meal.name}</Typography>
                  </Box>
                );
              })
            : null}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default MyMeals;
