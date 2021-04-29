import i18n from "i18next";
import React from "react";
import ReactDOM from "react-dom";
import { initReactI18next } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app/App";
import "./index.less";
import store from "./redux/store";
import * as serviceWorker from "./serviceWorker";
import "./styles.scss";
import de from "./translations/de/translation.json";
import en from "./translations/en/translation.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      de: {
        translation: de,
      },
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
