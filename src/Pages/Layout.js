import { Outlet } from "react-router-dom";
import CookieConsent, { Cookies } from "react-cookie-consent";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

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
