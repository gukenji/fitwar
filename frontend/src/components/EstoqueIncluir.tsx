import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  eraseSucessAlert,
  includeToInventory,
  setCurrentTab,
  updateErrorFrom,
} from "../store/features/estoqueSlice";
import { IIncludeToInventory } from "../interfaces/InventoryInterfaces";
import { IAlimento } from "../interfaces/FoodInterfaces";
import {
  selectFood,
  selectQuantity,
  updateInventory,
} from "../store/features/estoqueSlice";
import {
  Box,
  CardActions,
  Typography,
  Button,
  FormHelperText,
  Card,
  FormControl,
  Input,
  InputAdornment,
} from "@mui/material";
import { IFetchInventory } from "../interfaces/InventoryInterfaces";
import { NutritionalTable } from "./NutritionalTable";

const IncludeToInventory = () => {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector((state) => state.inventory.value);
  const access_token = useAppSelector((state) => state.auth.tokenInfo?.access);

  const success = useAppSelector((state) => state.inventory.success);
  const selected_food = useAppSelector((state) => state.inventory.food);
  const [foodExist, setFoodExist] = useState(false);
  const my_inventory = useAppSelector((state) => state.inventory.food_list);
  const message_tab = useAppSelector((state) => state.inventory.tab);

  const checkIfFoodExist = (key: number) => {
    const result = (my_inventory as IFetchInventory[]).some(
      (item) => item.food.id === key
    );
    setFoodExist(result);
  };

  const getFoodAtInventory = (key: number) => {
    const inventory = my_inventory?.find((x) => x.food.id === key);
    return inventory;
  };

  useEffect(() => {
    selected_food ? checkIfFoodExist(selected_food.id) : setFoodExist(false);
  }, [selected_food]);

  const handleQuantityInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = parseInt(e.target.value);
    if (value >= 0) {
      dispatch(selectQuantity(value));
    } else {
      dispatch(selectQuantity(""));
    }
  };

  const clearForm = () => {
    dispatch(selectQuantity(""));
    dispatch(selectFood(null));
  };

  const updateToInventory = async () => {
    if (quantity == "" || quantity == "0") {
      return dispatch(updateErrorFrom("INCLUDE"));
    }
    try {
      const inventory = getFoodAtInventory((selected_food as IAlimento).id);
      const inventory_json = JSON.parse(JSON.stringify(inventory));
      const updated_inventory = {
        token: access_token,
        food: selected_food?.id as number,
        quantity: inventory_json?.quantity + quantity,
        id: inventory_json?.id,
      };
      await dispatch(updateInventory(updated_inventory)).unwrap();
      dispatch(setCurrentTab("INCLUDE"));
    } catch (e) {
      console.log(e);
    }
  };
  const addToInventory = async () => {
    if (quantity == "" || quantity == "0") {
      return dispatch(updateErrorFrom("INCLUDE"));
    }
    try {
      const new_food: IIncludeToInventory = {
        token: access_token,
        food: selected_food?.id as number,
        quantity: quantity as number,
      };
      await dispatch(includeToInventory(new_food)).unwrap();
      dispatch(setCurrentTab("INCLUDE"));
      clearForm();
    } catch (e) {
      console.log(e);
    }
  };
  const handleIncludeToInventory = async () => {
    {
      foodExist ? updateToInventory() : addToInventory();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(eraseSucessAlert());
    }, 6000);
    return () => clearTimeout(timer);
  }, [success, dispatch]);

  const calculateMacros = (input_quantity: number, food: IAlimento | null) => {
    const carbs: string = food
      ? `${(input_quantity / +food?.peso_referencia) * +food?.carboidratos}`
      : `0`;
    const fat: string = food
      ? `${(input_quantity / +food?.peso_referencia) * +food?.gorduras}`
      : `0`;
    const protein: string = food
      ? `${(input_quantity / +food?.peso_referencia) * +food?.proteinas}`
      : `0`;
    const kcal: string = food
      ? `${(input_quantity / +food?.peso_referencia) * +food?.calorias}`
      : `0`;
    const macros = {
      carbs: parseFloat(carbs).toFixed(2),
      fat: parseFloat(fat).toFixed(2),
      protein: parseFloat(protein).toFixed(2),
      kcal: parseFloat(kcal).toFixed(2),
    };
    return macros;
  };
  return (
    <Card
      sx={{
        display: selected_food ? "inherit" : "none",
        border: "none",
        boxShadow: "none",
      }}
    >
      <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}>
        <FormControl variant="standard">
          {success == false && message_tab == "INCLUDE" ? (
            <FormHelperText
              id="standard-weight-helper-text"
              sx={{ color: "red", fontFamily: "VT323" }}
            >
              PREENCHA ESTE CAMPO
            </FormHelperText>
          ) : null}

          <Input
            onChange={handleQuantityInput}
            onFocus={() => dispatch(eraseSucessAlert())}
            value={quantity}
            type="number"
            id="standard-adornment-weight"
            required
            endAdornment={
              <InputAdornment position="end">
                <Typography sx={{ fontFamily: "VT323", fontSize: 25 }}>
                  GR
                </Typography>
              </InputAdornment>
            }
            aria-describedby="standard-weight-helper-text"
            sx={{
              fontFamily: "VT323",
              fontSize: 20,
              width: 100,
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
            inputProps={{ style: { textAlign: "end" } }}
          />
          <FormHelperText
            id="standard-weight-helper-text"
            sx={{ fontFamily: "VT323", fontSize: 15 }}
          >
            QUANTIDADE
          </FormHelperText>
        </FormControl>
      </Box>
      <NutritionalTable
        quantity={quantity as number}
        food={selected_food as IAlimento}
      />

      <CardActions>
        <Button
          sx={{ fontFamily: "VT323", margin: "0 auto", fontSize: 22 }}
          onClick={handleIncludeToInventory}
        >
          CADASTRAR
        </Button>
      </CardActions>
    </Card>
  );
};

export default IncludeToInventory;
