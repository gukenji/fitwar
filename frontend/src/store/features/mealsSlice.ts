import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import {
  IMeals,
  IMealsList,
  ICreateMeal,
} from "../../interfaces/MealsInterfaces";

const initialState: IMealsList & { open_icon: boolean; icon: string | null } = {
  meal_list: null,
  error: null,
  open_icon: false,
  icon: null,
  refreshed: false,
};

export const getMeals = createAsyncThunk("meals", async () => {
  const response = await axiosInstance.get("/meals/get/");
  const resData = response.data;
  return resData;
});

export const createMeal = createAsyncThunk(
  "create_food",
  async (data: ICreateMeal) => {
    const response = await axiosInstance.post("/meals/create/", data);
    const resData = response.data;
    return resData;
  }
);

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    setOpenIcon(state) {
      state.open_icon = !state.open_icon;
    },
    selectIcon(state, action) {
      state.icon = action.payload;
    },
    resetIcon(state) {
      state.icon = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMeals.pending, (state) => {
        state.error = "carregando...";
      })
      .addCase(getMeals.fulfilled, (state, action: PayloadAction<IMeals[]>) => {
        state.meal_list = action.payload;
        state.error = null;
        state.refreshed = true;
      })
      .addCase(getMeals.rejected, (state, action) => {
        state.meal_list = null;
        state.error = "falha ao recuperar refeições ";
      })
      .addCase(createMeal.pending, (state) => {})
      .addCase(
        createMeal.fulfilled,
        (state, action: PayloadAction<IMeals[]>) => {
          state.refreshed = false;
        }
      )
      .addCase(createMeal.rejected, (state, action) => {});
  },
});

export const { setOpenIcon, selectIcon, resetIcon } = mealsSlice.actions;

export default mealsSlice.reducer;
