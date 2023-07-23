import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import SignupFrom from "./components/SignupFrom.jsx";
import LoginFrom from "./components/LoginFrom.jsx";
import store from "./store/store.js";
import Logout from "./components/Logout.js";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ProfileScreen from "./components/ProfileScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/register" element={<SignupFrom />} />
      <Route path="/login" element={<LoginFrom />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
