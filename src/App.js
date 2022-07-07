import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage";

import "./App.css";
import Register from "./components/Users/Register";
import Login from "./components/Users/Login";
import NavBar from "./components/Navigation/Navbar";
import AddNewCategory from "./components/Category/AddNewCategory";
import CategoryList from "./components/Category/CategoriesList";
import UpdateCategory from "./components/Category/UpdatedCategory";
import PrivateProtectRoute from "./components/Navigation/ProtectedRoute/PrivateProtectedRoute";
import AdminProtectRoute from "./components/Navigation/ProtectedRoute/AdminProtectedRoute";
import CreatePost from "./components/Posts/CreatePost";
import PostsList from "./components/Posts/PostList";
import PostDetails from "./components/Posts/PostDetails";
import UpdatePost from "./components/Posts/UpdatePost";
import UpdateComment from "./components/Comments/UpdateComment";
import Profile from "./components/Users/Profile";
import UploadProfilePhoto from "./components/Users/UploadProfilePhoto";
import UpdateProfileForm from "./components/Users/UpdateProfileForm";
import SendEmail from "./components/Email/SendEmail";
import AccountVerified from "./components/Account/AccountVerified";
import UsersList from "./components/Users/UsersList";
import UpdatePassword from "./components/Password/UpdatePassword";
import ResetPasswordForm from "./components/Password/ResetPasswordForm";
import ResetPassword from "./components/Password/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes path="/">
        <Route
          path="/update-category/:id"
          element={
            <AdminProtectRoute>
              <UpdateCategory />
            </AdminProtectRoute>
          }
        />
        <Route
          path="/add-category/"
          element={
            <AdminProtectRoute>
              <AddNewCategory />
            </AdminProtectRoute>
          }
        />
        <Route
          path="category-list"
          element={
            <AdminProtectRoute>
              <CategoryList />
            </AdminProtectRoute>
          }
        />

        <Route
          path="users"
          element={
            <AdminProtectRoute>
              <UsersList />
            </AdminProtectRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <PrivateProtectRoute>
              <CreatePost />
            </PrivateProtectRoute>
          }
        ></Route>
        <Route
          path="/update-post/:id"
          element={
            <PrivateProtectRoute>
              <UpdatePost />
            </PrivateProtectRoute>
          }
        ></Route>
        <Route
          path="/update-comment/:id"
          element={
            <PrivateProtectRoute>
              <UpdateComment />
            </PrivateProtectRoute>
          }
        ></Route>
        <Route
          path="/profile/:id"
          element={
            <PrivateProtectRoute>
              <Profile />
            </PrivateProtectRoute>
          }
        ></Route>
        <Route
          path="/update-profile/:id"
          element={
            <PrivateProtectRoute>
              <UpdateProfileForm />
            </PrivateProtectRoute>
          }
        ></Route>
        <Route
          path="/upload-profile-photo/"
          element={
            <PrivateProtectRoute>
              <UploadProfilePhoto />
            </PrivateProtectRoute>
          }
        ></Route>

        <Route
          path="/send-mail/"
          element={
            <AdminProtectRoute>
              <SendEmail />
            </AdminProtectRoute>
          }
        ></Route>

        <Route
          path="/account-verification/:id"
          element={
            <PrivateProtectRoute>
              <AccountVerified />
            </PrivateProtectRoute>
          }
        ></Route>
        <Route
          path="/update-password"
          element={
            <PrivateProtectRoute>
              <UpdatePassword />
            </PrivateProtectRoute>
          }
        ></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ResetPasswordForm />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
