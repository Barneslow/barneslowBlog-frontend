import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

export const resetAccountAction = createAction("account/reset");

export const accountVerificationTokenAction = createAsyncThunk(
  "account/verification-token",
  async (email, { rejectWithValue, getState, dispatch }) => {
    const user = getState().user;

    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/send-verification`,
        {},
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

export const accountVerifiedAction = createAsyncThunk(
  "account/verified",
  async (token, { rejectWithValue, getState, dispatch }) => {
    const user = getState().user;

    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/account-verification`,
        { token },
        config
      );
      dispatch(resetAccountAction());

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

const accountSlices = createSlice({
  name: "account",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(accountVerificationTokenAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(
      accountVerificationTokenAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.tokenSent = action?.payload;
        state.appError = undefined;
        state.serverError = undefined;
      }
    );
    builder.addCase(
      accountVerificationTokenAction.rejected,
      (state, action) => {
        state.loading = false;
        state.appError = action?.payload?.message;
        state.serverError = action?.error?.message;
      }
    );

    builder.addCase(accountVerifiedAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(resetAccountAction, (state, action) => {
      state.isVerfied = true;
    });

    builder.addCase(accountVerifiedAction.fulfilled, (state, action) => {
      state.loading = false;
      state.verified = action?.payload;
      state.isVerfied = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(accountVerifiedAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default accountSlices;
