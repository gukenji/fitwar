import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { jwtDecode } from "jwt-decode";
import {
  IJWTDecode,
  ITokenInfo,
  IUserData,
  IUserLogin,
} from "../../interfaces/AuthInterfaces";

interface IRefresh {
  refresh: string;
  access: string;
}

interface IAuthApiState {
  tokenInfo: ITokenInfo | null;
  userProfileData: IUserData | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: IAuthApiState & { tab: null | number } = {
  tokenInfo: localStorage.getItem("tokenInfo")
    ? JSON.parse(localStorage.getItem("tokenInfo") as string)
    : null,
  userProfileData: localStorage.getItem("tokenInfo")
    ? {
        nome: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).nome,
        user_id: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).user_id,
        superuser: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).superuser,
        staff: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).staff,
        altura: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).altura,
        peso: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).peso,
        data_nascimento: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).data_nascimento,
        genero: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).genero,
        taxa_metabolica: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).taxa_metabolica,
        profile_pic: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).profile_pic,
        meta_calorias: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).meta_calorias,
      }
    : null,
  status: "idle",
  error: null,
  tab: null,
};

export const login = createAsyncThunk("login", async (data: IUserLogin) => {
  const response = await axiosInstance.post("/token/", data);
  const resData = response.data;
  localStorage.setItem("tokenInfo", JSON.stringify(resData));
  return resData;
});

export const getUser = createAsyncThunk(
  "get_user",
  async (data: { email: string }) => {
    const response = await axiosInstance.get(`/users/${data.email}/`);
    const resData = response.data;
    return resData;
  }
);

export const refresh = createAsyncThunk("refresh", async (data: IRefresh) => {
  const response = await axiosInstance.post("/token/refresh/", data);
  const resData = response.data;
  localStorage.setItem("tokenInfo", JSON.stringify(resData));
  return resData;
});

export const logout = createAsyncThunk("logout", async () => {
  localStorage.removeItem("tokenInfo");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    selectTab(state, action: PayloadAction<number | null>) {
      state.tab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<ITokenInfo>) => {
        state.status = "idle";
        state.tab = 0;
        state.tokenInfo = {
          refresh: action.payload.refresh,
          access: action.payload.access,
        };
        state.userProfileData = {
          user_id: jwtDecode<IJWTDecode>(state.tokenInfo.access).user_id,
          nome: jwtDecode<IJWTDecode>(state.tokenInfo.access).nome,
          superuser: jwtDecode<IJWTDecode>(state.tokenInfo.access).superuser,
          staff: jwtDecode<IJWTDecode>(state.tokenInfo.access).staff,
          data_nascimento: jwtDecode<IJWTDecode>(state.tokenInfo.access)
            .data_nascimento,
          peso: jwtDecode<IJWTDecode>(state.tokenInfo.access).peso,
          altura: jwtDecode<IJWTDecode>(state.tokenInfo.access).altura,
          genero: jwtDecode<IJWTDecode>(state.tokenInfo.access).genero,
          taxa_metabolica: jwtDecode<IJWTDecode>(state.tokenInfo.access)
            .taxa_metabolica,
          meta_calorias: jwtDecode<IJWTDecode>(state.tokenInfo.access)
            .meta_calorias,
          profile_pic: jwtDecode<IJWTDecode>(state.tokenInfo.access)
            .profile_pic,
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Login failed";
      })
      .addCase(refresh.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        refresh.fulfilled,
        (state, action: PayloadAction<ITokenInfo>) => {
          state.status = "idle";
          state.tokenInfo = {
            refresh: action.payload.refresh,
            access: action.payload.access,
          };
          state.userProfileData = {
            user_id: jwtDecode<IJWTDecode>(state.tokenInfo.access).user_id,
            nome: jwtDecode<IJWTDecode>(state.tokenInfo.access).nome,
            superuser: jwtDecode<IJWTDecode>(state.tokenInfo.access).superuser,
            staff: jwtDecode<IJWTDecode>(state.tokenInfo.access).staff,
            data_nascimento: jwtDecode<IJWTDecode>(state.tokenInfo.access)
              .data_nascimento,
            peso: jwtDecode<IJWTDecode>(state.tokenInfo.access).peso,
            altura: jwtDecode<IJWTDecode>(state.tokenInfo.access).altura,
            genero: jwtDecode<IJWTDecode>(state.tokenInfo.access).genero,
            taxa_metabolica: jwtDecode<IJWTDecode>(state.tokenInfo.access)
              .taxa_metabolica,
            meta_calorias: jwtDecode<IJWTDecode>(state.tokenInfo.access)
              .meta_calorias,
            profile_pic: jwtDecode<IJWTDecode>(state.tokenInfo.access)
              .profile_pic,
          };
        }
      )
      .addCase(refresh.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Login failed";
      })

      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.tab = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "idle";
        state.tokenInfo = null;
        state.userProfileData = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Logout failed";
      });
  },
});
export const { selectTab } = authSlice.actions;

export default authSlice.reducer;
