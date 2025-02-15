import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Buy from "./pages/Buy.jsx";
import Sell from "./pages/Sell.jsx";
import Services from "./pages/Services.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Sign.jsx";
import Property from "./pages/Property.jsx";
import ScrollToTop from "./components/ScrollTop.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import User from "./pages/User.jsx";
import Fav from "./pages/Fav.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "Contact",
        element: <Contact />,
      },
      {
        path: "buy",
        element: <Buy />,
      },
      {
        path: "sell",
        element: <Sell />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/property/:id",
        element: <Property />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/favourites",
        element: <Fav />,
      },
      {
        path: "*",
        element: (
          <div className="min-h-[32vh] flex items-center justify-center font-bold">
            <p>You have reached the undefined path go back to the home page</p>
          </div>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="min-h-[32vh] flex items-center justify-center font-bold">
        Page not found
      </div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
        <ScrollToTop />
      </RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
