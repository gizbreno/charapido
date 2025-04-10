import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/userContext.jsx";

//fonts
import "@fontsource/handlee"; // Substituta para "Handelson Three"
import "@fontsource/schoolbell"; // Aproximação para "Ballpoint"
import "@fontsource/whisper"; // Aproximação para "Vintage Rooter"
import "@fontsource/arima-madurai";
import "@fontsource/kaushan-script";
import "@fontsource/shantell-sans";
import "@fontsource/playfair-display";
import "@fontsource/nunito";
import "@fontsource/raleway"; // Substituta para "Glypher"
import "@fontsource/montserrat";
import "@fontsource/parisienne";
import "@fontsource/baloo-2"; // Aproximação para "Baldoa"
import "@fontsource/saira-stencil-one"; // Aproximação para "Sifonn"
import "@fontsource/lemon"; // Aproximação para "Lemon Tuesday"
import "@fontsource/mooli"; // Aproximação para "Mommi"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
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
    </UserProvider>
  </StrictMode>
);
