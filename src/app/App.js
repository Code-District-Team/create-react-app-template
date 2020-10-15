import React from "react";
import Routes from "./routes";
import { useLocation } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.scss";
import LoggedInPageLayout from "../layout/loggedInPageLayout";
import GuestPageLayout from "../layout/guestPageLayout";
import * as GeneralUtility from "../utilities/generalUtility";

function App() {
  const pathname = useLocation().pathname;
  const isGuestPage = GeneralUtility.isGuestPage(pathname);
  const layout = isGuestPage ? (
    <GuestPageLayout>
      <Routes />
    </GuestPageLayout>
  ) : (
    <LoggedInPageLayout>
      <Routes />
    </LoggedInPageLayout>
  );

  return (
    <div className="App">
      {layout}
    </div>
  );
}

export default App;
