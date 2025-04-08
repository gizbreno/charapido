import { createBrowserRouter } from "react-router-dom";

import Layout from './components/Layout'
import DashBoard from './pages/DashBoard'
import Login from './pages/Login'
import Register from './pages/Register'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element:  <DashBoard />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);