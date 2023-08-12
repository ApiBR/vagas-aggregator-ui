import React from "react";
import ReactDOM from "react-dom/client";
import "toastr";
import "./index.css";
import "./bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "toastr/build/toastr.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
reportWebVitals(sendToGoogleAnalytics);

function sendToGoogleAnalytics({ name, delta, value, id, _ }) {
  const eventParams = {
    value: delta,
    metric_id: id,
    metric_value: value,
    metric_delta: delta,
  };
  window.gtag("event", name, eventParams);
}
