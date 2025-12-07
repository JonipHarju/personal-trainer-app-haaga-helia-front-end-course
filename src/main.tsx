import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import FrontPage from "./components/FrontPage.tsx";
import Customers from "./components/Customers.tsx";
import Training from "./components/Training.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Calendar from "./components/Calendar.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { element: <FrontPage />, index: true },
      { path: "customers", element: <Customers /> },
      { path: "training", element: <Training /> },
      { path: "calendar", element: <Calendar /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
