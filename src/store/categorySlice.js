import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

// Action to redirect
const resetEditAction = createAction("category/reset");
const resetDeleteAction = createAction("category/delete-reset");
const resetAddCategoryAction = createAction("category/create-reset");

export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (category, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/category`,
        {
          title: category?.title,
        },
        config
      );
      dispatch(resetAddCategoryAction());

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchAllCategories = createAsyncThunk(
  "category/fetch",
  async (category, { rejectWithValue, getState, dispatch }) => {
    const user = getState().user;

    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.get(`${baseUrl}/api/category`, config);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateCategoryAction = createAsyncThunk(
  "category/update",
  async (category, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;

    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/category/${category?.id}`,
        { title: category?.title },
        config
      );
      dispatch(resetEditAction());

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;

    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.delete(
        `${baseUrl}/api/category/${id}`,
        config
      );

      dispatch(resetDeleteAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchCategory = createAsyncThunk(
  "category/fetchOne",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;

    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.get(`${baseUrl}/api/category/${id}`, config);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

const categorySlices = createSlice({
  name: "category",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(resetAddCategoryAction, (state, action) => {
      state.isCreated = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.isCreated = false;

      state.loading = false;
      state.category = action.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Fetch
    builder.addCase(fetchAllCategories.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryList = action.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchAllCategories.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Update
    builder.addCase(updateCategoryAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(resetEditAction, (state, action) => {
      state.isEdited = true;
    });

    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isEdited = false;
      state.updateCategory = action.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updateCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Delete
    builder.addCase(deleteCategory.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(resetDeleteAction, (state, action) => {
      state.isDeleted = true;
    });

    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = false;
      state.deleteCategory = action.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Get Category
    builder.addCase(fetchCategory.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default categorySlices;
