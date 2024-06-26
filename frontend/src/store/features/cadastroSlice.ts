import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IRegisterFirstStep,
  IRegisterSecondStep,
} from "../../interfaces/RegisterInterfaces";
import { RootState } from "../store";
import axios from "axios";

const initialState: IRegisterFirstStep &
  IRegisterSecondStep & { step: number } = {
  step: 1,
  email: null,
  password: null,
  password_confirmation: null,
  nome: null,
  data_nascimento: null,
  peso: null,
  altura: null,
  genero: null,
  profile_pic: null,
};

export const cadastrarUser = createAsyncThunk(
  "cadastrar",
  async (args, api) => {
    const state = api.getState() as RootState;
    const data = {
      email: state.register.email,
      password: state.register.password,
      password_confirmation: state.register.password_confirmation,
      nome: state.register.nome,
      peso: state.register.peso,
      altura: state.register.altura,
      data_nascimento: state.register.data_nascimento,
      genero: state.register.genero,
      profile_pic: state.register.profile_pic,
    };
    console.log(data);

    const response = await axios.post(
      "http://localhost:8000/api/users/cadastrar/",
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const resData = response.data;
    return resData;
  }
);

const cadastroSlice = createSlice({
  name: "cadastro",
  initialState,
  reducers: {
    setPrimeiroPasso(state, action: PayloadAction<IRegisterFirstStep>) {
      state.step = 2;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.password_confirmation = action.payload.password_confirmation;
    },
    setSegundoPasso(state, action: PayloadAction<IRegisterSecondStep>) {
      state.altura = action.payload.altura;
      state.nome = action.payload.nome;
      state.peso = action.payload.peso;
      state.data_nascimento = action.payload.data_nascimento;
      state.genero = action.payload.genero;
      state.profile_pic = action.payload.profile_pic;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cadastrarUser.pending, (state) => {})
      .addCase(cadastrarUser.fulfilled, (state, action) => {
        state.step = 1;
      })
      .addCase(cadastrarUser.rejected, (state, action) => {});
  },
});
export const { setPrimeiroPasso, setSegundoPasso } = cadastroSlice.actions;
export default cadastroSlice.reducer;
