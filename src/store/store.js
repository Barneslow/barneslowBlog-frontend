import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import commentSlices from "./commentSlice";
import postSlice from "./postSlice";
import usersSlices from "./usersSlices";
import emailSlices from "./emailSlice";
import accountSlices from "./accountVerificationSlice";
import passwordSlices from "./passwordSlice";

const store = configureStore({
  reducer: {
    user: usersSlices.reducer,
    categories: categorySlice.reducer,
    posts: postSlice.reducer,
    comments: commentSlices.reducer,
    email: emailSlices.reducer,
    account: accountSlices.reducer,
    password: passwordSlices.reducer,
  },
});

export default store;
