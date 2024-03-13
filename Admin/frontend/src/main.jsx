import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
//import './index.css'

//entry point of the front-end application

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-26f7zmnedn3zchbh.us.auth0.com"
    clientId="7UMrojhW4KeEcLtBAUlYzr8iEq16SyNe"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
