import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

import "@fontsource/outfit";
import "@fontsource/roboto";
// import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ErrorBoundary> */}
    <App />
    {/* </ErrorBoundary> */}
    {/* <div>
      hello
    </div> */}

  </React.StrictMode>
);