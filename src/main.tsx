import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import FrontPage from "./components/FrontPage.tsx";
import Customers from "./components/Customers.tsx";
import Training from "./components/Training.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { element: <FrontPage />, index: true },
      { path: "customers", element: <Customers /> },
      { path: "training", element: <Training /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
