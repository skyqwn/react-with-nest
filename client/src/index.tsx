import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import ProtectRouter from "./components/ProtectRouter";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </ApolloProvider>
);
