import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

const resetPost = createAction("post/reset");
const resetPostEdit = createAction("post/reset-edit");
const resetPostDelete = createAction("post/reset-delete");

export const createPostAction = createAsyncThunk(
  "post/created",
  async (post, { rejectWithValue, getState, dispatch }) => {
    const user = getState().user;

    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const formData = new FormData();

      console.log(post);
      formData.append("title", post?.title);
      formData.append("description", post?.description);
      formData.append("category", post?.category?.label);
      formData.append("image", post?.image);

      const { data } = await axios.post(
        `${baseUrl}/api/posts`,
        formData,
        config
      );

      dispatch(resetPost());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updatePostAction = createAsyncThunk(
  "post/update",
  async (post, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/posts/${post?.id}`,
        post,
        config
      );

      dispatch(resetPostEdit());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deletePostAction = createAsyncThunk(
  "post/delete",
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
      const { data } = await axios.delete(`${baseUrl}/api/posts/${id}`, config);
      dispatch(resetPostDelete());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchPostsAction = createAsyncThunk(
  "post/list",
  async (category, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/posts/?category=${category}`
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

export const fetchPostDetailsAction = createAsyncThunk(
  "post/details",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/posts/${id}`);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

export const toggleAddLikesToPost = createAsyncThunk(
  "post/likes",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    const user = getState().user;

    const { userAuth } = user;

    console.log(userAuth?.token);

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${baseUrl}/api/posts/likes`,
        { postId },
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

export const toggleDislikeToPost = createAsyncThunk(
  "post/dislike",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    const user = getState().user;

    const { userAuth } = user;

    console.log(userAuth?.token);

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${baseUrl}/api/posts/dislikes`,
        { postId },
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

const postSlice = createSlice({
  name: "post",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(createPostAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(resetPost, (state, action) => {
      state.isCreated = true;
    });
    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isCreated = false;
      state.postCreated = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(createPostAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    //  Fetch
    builder.addCase(fetchPostsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.postList = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Fetch one post
    builder.addCase(fetchPostDetailsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPostDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.postDetails = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchPostDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // UpdatePost
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(resetPostEdit, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.postDetails = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Delete Post
    builder.addCase(deletePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPostDelete, (state, action) => {
      state.isDeleted = true;
    });

    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = false;
      state.postDetails = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(deletePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Likes
    builder.addCase(toggleAddLikesToPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(toggleAddLikesToPost.fulfilled, (state, action) => {
      state.loading = false;
      state.likes = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(toggleAddLikesToPost.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Dislike
    builder.addCase(toggleDislikeToPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(toggleDislikeToPost.fulfilled, (state, action) => {
      state.loading = false;
      state.dislikes = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(toggleDislikeToPost.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default postSlice;
