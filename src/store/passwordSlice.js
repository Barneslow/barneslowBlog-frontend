import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/baseUrl";
import axios from "axios";

const resetUserPassword = createAction("password/profile/reset");

export const updatePasswordAction = createAsyncThunk(
  "password/update",
  async (password, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/password/`,
        { password },
        config
      );
      dispatch(resetUserPassword());

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const resetPasswordTokenAction = createAsyncThunk(
  "password/reset-token",
  async (email, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/forget-password`,
        { email },
        config
      );
      // dispatch(resetUserPassword());

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const resetPasswordAction = createAsyncThunk(
  "password/reset",
  async (resetData, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/password-reset`,
        resetData,
        config
      );
      // dispatch(resetUserPassword());

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const passwordSlices = createSlice({
  name: "password",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(updatePasswordAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(resetUserPassword, (state, action) => {
      state.isPasswordUpdated = true;
    });

    builder.addCase(updatePasswordAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordUpdated = action?.payload;
      state.isPasswordUpdated = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updatePasswordAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Password Reset Token
    builder.addCase(resetPasswordTokenAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(resetPasswordTokenAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordToken = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(resetPasswordTokenAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Password Reset
    builder.addCase(resetPasswordAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(resetPasswordAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordReset = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(resetPasswordAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default passwordSlices;
