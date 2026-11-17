import "./App.scss";
import "bootstrap/dist/js/bootstrap.bundle"
import { ConfigProvider, App as AntdApp } from "antd"

import Routes from "./pages/Routes"
import ScreenLoader from "./components/Misc/screenLoader"
import { useAuth } from "./context/Auth";
import { useEffect } from "react";

const GlobalMessageSetter = () => {
  const { message } = AntdApp.useApp();
  useEffect(() => {
    window.toastify = (msg, type = "info") => {
      // Defer to next tick so it never triggers during React render cycles
      setTimeout(() => {
        if (message && typeof message[type] === "function") {
          message[type](msg);
        }
      }, 0);
    };
  }, [message]);
  return null;
}

const App = () => {

  const { isAppLoading } = useAuth()

  return (
    <>
      <ConfigProvider theme={{ token: { colorPrimary: "#1d3357" }, components: { Button: { controlOutlineWidth: 0 } } }}>
        <AntdApp>
          <GlobalMessageSetter />
          {!isAppLoading
            ? <Routes />
            : <ScreenLoader />
          }
        </AntdApp>
      </ConfigProvider>
    </>
  )
}

export default App