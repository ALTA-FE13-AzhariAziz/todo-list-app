import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./utils/redux/store/store";
import App from "./routes";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
