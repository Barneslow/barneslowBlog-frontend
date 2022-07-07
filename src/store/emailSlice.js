import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

const resetEmailAction = createAction("mail/reset");

export const sendEmailAction = createAsyncThunk(
  "email/create",
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
        `${baseUrl}/api/email`,
        {
          to: email?.recipientEmail,
          subject: email?.subject,
          message: email?.message,
        },
        config
      );

      dispatch(resetEmailAction());

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

const emailSlices = createSlice({
  name: "email",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(sendEmailAction.pending, (state, action) => {
      state.loading = true;
      state.isMailSent = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(resetEmailAction, (state, action) => {
      state.isMailSent = true;
    });

    builder.addCase(sendEmailAction.fulfilled, (state, action) => {
      state.loading = false;
      state.mailSent = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(sendEmailAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default emailSlices;
