import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css"

const router = createBrowserRouter([{ path: "/", element: <Home /> }]);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
