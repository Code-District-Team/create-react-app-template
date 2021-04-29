// import i18n from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "react-router-dom";
import CustomRoute from "../routes/customRoute";
import routes from "../routes/routes";
import "./App.less";

function App() {
  const { t } = useTranslation();
  return (
    <div className="App">
      {/* <Switch
        onChange={(v) => {
          i18n.changeLanguage(v ? "de" : "en");
        }}
      >
        Change Language
      </Switch>
      <h2>{t("Welcome to React")}</h2> */}
      <Switch>
        {routes.map((route, i) => (
          <CustomRoute key={i} {...route} exact={route.exact ?? false} />
        ))}
      </Switch>
    </div>
  );
}

export default App;
