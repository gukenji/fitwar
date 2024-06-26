import { useAppDispatch, useAppSelector } from "../store/store";
import { getAlimentos } from "../store/features/alimentosSlice";
import { useEffect } from "react";
import { getEstoque } from "../store/features/estoqueSlice";
import { IAlimento } from "../interfaces/FoodInterfaces";
import {
  Box,
  Divider,
  Typography,
  TextField,
  Autocomplete,
  FormHelperText,
} from "@mui/material";
import { eraseSucessAlert, selectFood } from "../store/features/estoqueSlice";
import { useState } from "react";
import { IFetchInventory } from "../interfaces/InventoryInterfaces";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { customTheme } from "../styles/SearchFieldTheme";
const SearchFood = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("");
  const isRefreshed = useAppSelector((state) => state.foods.refreshed);
  const foods = useAppSelector((state) => state.foods.food_list);
  const food = useAppSelector((state) => state.inventory.food);
  const my_freezer = useAppSelector((state) => state.inventory.food_list);
  const isFreezerRefreshed = useAppSelector(
    (state) => state.inventory.refreshed
  );
  const [foodExist, setFoodExist] = useState(false);
  const outerTheme = useTheme();

  const checkIfFoodExist = (key: number) => {
    const result = (my_freezer as IFetchInventory[]).some(
      (item) => item.food.id === key
    );
    setFoodExist(result);
  };

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        await dispatch(getAlimentos()).unwrap();
      } catch (e) {
        console.error(e);
      }
    };
    !isRefreshed ? fetchFoods() : null;
  }, [isRefreshed, dispatch]);

  useEffect(() => {
    const fetchFreezer = async () => {
      try {
        await dispatch(getEstoque()).unwrap();
      } catch (e) {
        console.error(e);
      }
    };
    !isFreezerRefreshed ? fetchFreezer() : null;
  }, [!isFreezerRefreshed, dispatch]);

  useEffect(() => {
    food ? checkIfFoodExist(food.id) : setFoodExist(false);
  }, [food]);

  const helperText = (
    <Box>
      <FormHelperText
        id="standard-weight-helper-text"
        sx={{ color: "red", fontFamily: "VT323", fontSize: 14 }}
      >
        ALIMENTO JÁ CADASTRADO EM SEU INVENTÁRIO.
      </FormHelperText>
      <FormHelperText
        id="standard-weight-helper-text"
        sx={{ color: "red", fontFamily: "VT323", fontSize: 14 }}
      >
        CADASTRA-LO NOVAMENTE SOMARÁ À QUANTIDADE EXISTENTE.
      </FormHelperText>
    </Box>
  );

  return (
    <>
      <Box>
        <Autocomplete
          value={food}
          ListboxProps={{
            style: { boxShadow: "2.6px 5.3px 20px hsl(0deg 0% 0% / 0.42)" },
          }}
          filterSelectedOptions
          noOptionsText={
            <Typography
              component={"span"}
              sx={{ fontFamily: "VT323", fontSize: 20 }}
            >
              ALIMENTO NÃO ENCONTRADO
            </Typography>
          }
          onChange={(event, newFood: IAlimento | null) => {
            dispatch(selectFood(newFood));
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={foods as IAlimento[]}
          getOptionLabel={(option) => (option as { name: string }).name}
          renderOption={(props, option) => (
            <div key={option.id}>
              <li
                {...props}
                style={{
                  fontFamily: "VT323",
                  fontSize: 20,
                  paddingTop: 0,
                  paddingBottom: 0,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                {option?.name}
              </li>
              <Divider />
            </div>
          )}
          renderInput={(params) => (
            <ThemeProvider theme={customTheme(outerTheme)}>
              <TextField
                {...params}
                variant="standard"
                label="BUSCAR ALIMENTO"
                onClick={() => dispatch(eraseSucessAlert())}
                InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
                inputProps={{
                  ...params.inputProps,
                  style: {
                    fontFamily: "VT323",
                    fontSize: 20,
                  },
                }}
                sx={{
                  "& input:focus": {
                    boxShadow: "none",
                  },
                }}
              />
            </ThemeProvider>
          )}
        />
        {foodExist ? helperText : <></>}
      </Box>
    </>
  );
};

export default SearchFood;
