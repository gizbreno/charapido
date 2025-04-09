import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoutes";
import Publicroute from "./components/PublicRoutes";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Publicroute><Login /></Publicroute>,
  },
  {
    path: "/register",
    element: <Publicroute><Register /></Publicroute>,
  },
]);
