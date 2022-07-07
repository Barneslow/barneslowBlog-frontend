import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { create } from "yup/lib/array";
import { baseUrl } from "../utils/baseUrl";

const resetCommentAction = createAction("comment/reset");

export const createCommentAction = createAsyncThunk(
  "comment/create",
  async (comment, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/comments`,
        {
          description: comment?.description,
          postId: comment?.postId,
        },
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

export const updateCommentAction = createAsyncThunk(
  "comment/update",
  async (comment, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/comments/${comment?.id}`,
        { description: comment?.description },
        config
      );
      dispatch(resetCommentAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchCommentAction = createAsyncThunk(
  "comment/fetch-comment",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState().user;

    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(
        `${baseUrl}/api/comments/${id}`,

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

export const deleteCommmentAction = createAsyncThunk(
  "comment/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState().user;

    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.delete(
        `${baseUrl}/api/comments/${id}`,
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

const commentSlices = createSlice({
  name: "comment",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(createCommentAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(createCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.createdComment = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(createCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Fetch
    builder.addCase(fetchCommentAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(fetchCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentDetails = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Update
    builder.addCase(updateCommentAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(resetCommentAction, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updateCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.commentUpdated = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(updateCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Delete

    builder.addCase(deleteCommmentAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(deleteCommmentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentDeleted = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(deleteCommmentAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default commentSlices;
