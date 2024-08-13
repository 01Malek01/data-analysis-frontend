import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Auth0Wrapper from "./components/Auth/Auth0Wrapper.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileContextProvider from "./Context/FileContext.tsx";
import DarkModeContextProvider from "./Context/DarkModeContext.tsx";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <Auth0Wrapper>
        <DarkModeContextProvider>
          <FileContextProvider>
            <App />
          </FileContextProvider>
        </DarkModeContextProvider>
        <ToastContainer />
      </Auth0Wrapper>
    </QueryClientProvider>
  </React.StrictMode>
);
