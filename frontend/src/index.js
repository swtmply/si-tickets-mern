import ReactDOM from "react-dom";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";
import "./sass/index.scss";

// create client for API queries
const client = new QueryClient();

ReactDOM.render(
  // provides the client to the Application
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>,
  document.getElementById("root")
);
