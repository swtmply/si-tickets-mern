import ReactDOM from "react-dom";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";

const client = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>,
  document.getElementById("root")
);
