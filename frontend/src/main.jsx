import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "../redux/store";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
