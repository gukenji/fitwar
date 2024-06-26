import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { IAlimento, IAlimentosLista } from "../../interfaces/FoodInterfaces";
import { create } from "@mui/material/styles/createTransitions";

const initialState: IAlimentosLista = {
  food_list: null,
  error: null,
  refreshed: false,
};

export const createAlimento = createAsyncThunk(
  "create_alimento",
  async (data: IAlimento) => {
    const response = await axiosInstance.post("/alimentos/", data);
    const resData = response.data;
    return resData;
  }
);

export const getAlimentos = createAsyncThunk("get_alimento", async () => {
  const response = await axiosInstance.get("/alimentos/");
  const resData = response.data;
  return resData;
});

const alimentosSlice = createSlice({
  name: "alimentos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAlimentos.pending, (state) => {
        state.error = "carregando...";
      })
      .addCase(
        getAlimentos.fulfilled,
        (state, action: PayloadAction<IAlimento[]>) => {
          state.food_list = action.payload;
          state.error = null;
          state.refreshed = true;
        }
      )
      .addCase(getAlimentos.rejected, (state, action) => {
        state.food_list = null;
        state.error = "falha ao recuperar refeições ";
      })
      .addCase(createAlimento.pending, (state) => {})
      .addCase(
        createAlimento.fulfilled,
        (state, action: PayloadAction<IAlimento[]>) => {
          state.refreshed = false;
        }
      )
      .addCase(createAlimento.rejected, (state, action) => {});
  },
});

export default alimentosSlice.reducer;
