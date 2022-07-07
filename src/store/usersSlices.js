import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/baseUrl";
import axios from "axios";

//register action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    //http call
    try {
      const response = await fetch(`${baseUrl}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const data = await response.json();

        throw data.message;
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateUserAction = createAsyncThunk(
  "users/update",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const user = getState().user;

    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/`,
        {
          lastName: userData?.lastName,
          firstName: userData?.firstName,
          bio: userData?.bio,
          email: userData?.email,
        },
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const LoginUserAction = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      //make http call
      const { data } = await axios.post(
        `${baseUrl}/api/users/login`,
        userData,
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const LogoutUserAction = createAsyncThunk(
  "user/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Fetch All Users

export const fetchAllUsersAction = createAsyncThunk(
  "user/users",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const user = getState().user;

    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${baseUrl}/api/users/`, config);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

// Fetch User Details

export const fetchUserDetailsAction = createAsyncThunk(
  "user/user-details",
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
        `${baseUrl}/api/users/${id}`,

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

// FetchProfile
export const fetchUserProfileAction = createAsyncThunk(
  "user/profile",
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
        `${baseUrl}/api/users/profile/${id}`,

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

export const uploadProfilePhoto = createAsyncThunk(
  "user/profile-photo",
  async (image, { rejectWithValue, getState, dispatch }) => {
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

      formData.append("image", image);

      console.log(`${baseUrl}/api/users/upload-profile-photo`);
      const { data } = await axios.post(
        `${baseUrl}/api/users/upload-profile-photo`,
        formData,
        config
      );

      console.log(data);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

export const followUserAction = createAsyncThunk(
  "users/follow",
  async (followId, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/users/follow`,
        { followId },
        config
      );

      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const unfollowUserAction = createAsyncThunk(
  "user/unfollow",
  async (followId, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/unfollow`,
        { followId },
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

// Block User
export const blockUserAction = createAsyncThunk(
  "user/block",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/block-user/${id}`,
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

// Unblock User

export const unblockUserAction = createAsyncThunk(
  "user/unblock",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/unblock-user/${id}`,
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

const usersSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: userLoginFromStorage,
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // LOGIN
    builder.addCase(LoginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(LoginUserAction.fulfilled, (state, action) => {
      state.userAuth = action.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(LoginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // LOGOUT
    builder.addCase(LogoutUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(LogoutUserAction.fulfilled, (state, action) => {
      state.userAuth = undefined;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(LogoutUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Fetch All Users
    builder.addCase(fetchAllUsersAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchAllUsersAction.fulfilled, (state, action) => {
      state.usersList = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchAllUsersAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Fetch Details Profile
    builder.addCase(fetchUserDetailsAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchUserDetailsAction.fulfilled, (state, action) => {
      state.userDetails = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchUserDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Fetch User Profile
    builder.addCase(fetchUserProfileAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchUserProfileAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchUserProfileAction.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Update User Proile
    builder.addCase(updateUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
      state.isUpdated = true;
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedUser = action.payload;
      state.isUpdated = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // UPLOAD PROFILE PHOTO
    builder.addCase(uploadProfilePhoto.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(uploadProfilePhoto.fulfilled, (state, action) => {
      state.loading = false;
      state.profilePhoto = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(uploadProfilePhoto.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Follow User
    builder.addCase(followUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(followUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.followed = action?.payload;
      state.unFollowed = undefined;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(followUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.unFollowed = undefined;
      state.serverErr = action?.error?.message;
    });

    // Unfollow User
    builder.addCase(unfollowUserAction.pending, (state, action) => {
      state.unfollowLoading = true;
      state.unFollowedAppErr = undefined;
      state.unfollowServerErr = undefined;
    });
    builder.addCase(unfollowUserAction.fulfilled, (state, action) => {
      state.unfollowLoading = false;
      state.unFollowed = action?.payload;
      state.followed = undefined;
      state.unFollowedAppErr = undefined;
      state.unfollowServerErr = undefined;
    });
    builder.addCase(unfollowUserAction.rejected, (state, action) => {
      state.unfollowLoading = false;
      state.unFollowedAppErr = action?.payload?.message;
      state.unfollowServerErr = action?.error?.message;
    });

    // Block User
    builder.addCase(blockUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(blockUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.blocked = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(blockUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // unBlock User
    builder.addCase(unblockUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(unblockUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.unblocked = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(unblockUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default usersSlices;
