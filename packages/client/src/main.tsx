import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./css/style.scss";
import "react-datetime/css/react-datetime.css";
import AppLoader from "./app/common/AppLoader";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import "./app/i18n";

const queryCache = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<AppLoader />}>
        <QueryClientProvider client={queryCache}>
          <App />
        </QueryClientProvider>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
