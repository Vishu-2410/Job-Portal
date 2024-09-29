

import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.js";
import App from "./App.js";
import axios from "axios";


axios.defaults.baseURL = "http://localhost:5000"

export const Context = createContext({
  isAuthorized: false,
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }} >
      <App></App>
    </Context.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
