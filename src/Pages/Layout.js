import { Outlet } from "react-router-dom";
import CookieConsent from "react-cookie-consent";
import { NavBar, Footer} from "../Components/Layout";

const Layout = () => {
  return (
    <div className="container-fluid">
      <NavBar />
      <Outlet />
      <Footer />
      <CookieConsent
        location="bottom"
        buttonText="Aceito"
        cookieName="consentCookie"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
      >
        Este site usa cookies de rastreamento do Google Analytics.
      </CookieConsent>
    </div>
  );
};

export default Layout;
