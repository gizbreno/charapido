import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {ToastContainer} from 'react-toastify'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      draggable
      theme="light"
    />
      <RouterProvider router={router} />
      
  </StrictMode>
);
