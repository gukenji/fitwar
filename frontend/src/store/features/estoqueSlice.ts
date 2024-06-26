import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import {
  IExcludeFromInventory,
  IFetchInventory,
  IGetInventory,
  IIncludeToInventory,
  IInputQuantity,
  IInventoryDialog,
  IInventoryStatus,
  IUpdateToInventory,
} from "../../interfaces/InventoryInterfaces";
import { IAlimento } from "../../interfaces/FoodInterfaces";

const initialState: IGetInventory &
  IInputQuantity &
  IInventoryStatus &
  IInventoryDialog = {
  food: null,
  value: "",
  food_list: null,
  error: null,
  refreshed: false,
  success: null,
  request_type: null,
  success_message: "",
  error_message: "",
  open_edit: false,
  open_delete: false,
  tab: null,
};

export const getEstoque = createAsyncThunk("get_estoque", async () => {
  const response = await axiosInstance.get("/estoques/");
  const resData = response.data;
  return resData;
});

export const includeToInventory = createAsyncThunk(
  "include_to_inventory",
  async (data: IIncludeToInventory) => {
    const response = await axiosInstance.post("/estoques/", data);
    const resData = response.data;
    return resData;
  }
);

export const updateInventory = createAsyncThunk(
  "update_estoque",
  async (data: IUpdateToInventory) => {
    const response = await axiosInstance.post(`/estoques/${data.id}/`, data);
    const resData = response.data;
    return resData;
  }
);

export const deleteFromInventory = createAsyncThunk(
  "delete_from_inventory",
  async (data: IExcludeFromInventory) => {
    const response = await axiosInstance.delete(
      `/inventory/delete/${data.id}/`,
      { data: { token: data.token } }
    );
    const resData = response.data;
    return resData;
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    selectQuantity(state, action: PayloadAction<number | string>) {
      state.value = action.payload;
    },
    selectFood(state, action: PayloadAction<IAlimento | null>) {
      state.food = action.payload;
    },
    eraseSucessAlert(state) {
      state.success = null;
    },
    resetRefresh(state) {
      state.refreshed = false;
    },
    setOpenEditDialog(state) {
      state.open_edit = !state.open_edit;
    },
    setOpenDeleteDialog(state) {
      state.open_delete = !state.open_delete;
    },
    updateErrorFrom(state, action: PayloadAction<"INVENTORY" | "INCLUDE">) {
      state.tab = action.payload;
      state.success = false;
      state.request_type = "UPDATE";
      state.success_message = "";
      state.error_message =
        state.tab == "INVENTORY"
          ? "ERRO AO ALTERAR ALIMENTO"
          : "ERRO AO CADASTRAR ALIMENTO";
    },
    setCurrentTab(state, action: PayloadAction<"INVENTORY" | "INCLUDE">) {
      state.tab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEstoque.pending, (state) => {
        state.error = "carregando...";
      })
      .addCase(
        getEstoque.fulfilled,
        (state, action: PayloadAction<IFetchInventory[]>) => {
          state.food_list = action.payload;
          state.error = null;
          state.refreshed = true;
        }
      )
      .addCase(getEstoque.rejected, (state, action) => {
        state.food_list = null;
        state.error = "falha ao recuperar refeições";
      })
      .addCase(includeToInventory.pending, (state) => {})
      .addCase(
        includeToInventory.fulfilled,
        (state, action: PayloadAction<IFetchInventory[]>) => {
          state.refreshed = false;
          state.success = true;
          state.request_type = "POST";
          state.success_message = "ALIMENTO CADASTRADO COM SUCESSO!";
          state.error_message = "";
        }
      )
      .addCase(includeToInventory.rejected, (state, action) => {
        state.success = false;
        state.request_type = "POST";
        state.success_message = "";
        state.error_message = "ERRO AO CADASTRAR ALIMENTO";
      })
      .addCase(updateInventory.pending, (state) => {})
      .addCase(
        updateInventory.fulfilled,
        (state, action: PayloadAction<IFetchInventory[]>) => {
          state.refreshed = false;
          state.success = true;
          state.request_type = "UPDATE";
          state.success_message = "ALIMENTO ALTERADO COM SUCESSO!";
          state.error_message = "";
        }
      )
      .addCase(updateInventory.rejected, (state, action) => {
        state.success = false;
        state.request_type = "UPDATE";
        state.success_message = "";
        state.error_message = "ERRO AO CADASTRAR ALIMENTO";
      })
      .addCase(deleteFromInventory.pending, (state) => {})
      .addCase(
        deleteFromInventory.fulfilled,
        (state, action: PayloadAction<IFetchInventory[]>) => {
          state.refreshed = false;
          state.success = true;
          state.request_type = "DELETE";
          state.success_message = "ALIMENTO DELETADO COM SUCESSO!";
          state.error_message = "";
        }
      )
      .addCase(deleteFromInventory.rejected, (state, action) => {
        state.success = false;
      });
  },
});
export const {
  selectQuantity,
  selectFood,
  eraseSucessAlert,
  resetRefresh,
  setOpenEditDialog,
  setOpenDeleteDialog,
  updateErrorFrom,
  setCurrentTab,
} = inventorySlice.actions;

export default inventorySlice.reducer;
