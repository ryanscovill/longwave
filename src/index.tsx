import "./index.css";
import "rc-slider/assets/index.css";
import "tippy.js/dist/tippy.css";

import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase/app";

import App from "./components/App";
import { firebaseConfig } from "./firebaseConfig";
import { useAnimatedBackgroundGradient } from "./components/common/useAnimatedBackgroundGradient";

// import i18n (needs to be bundled ;))
import "./i18n";

firebase.initializeApp(firebaseConfig);
firebase.analytics().logEvent("screen_view", {
  app_name: "Longwave",
  screen_name: "index",
} as any);

function SuspenseFallback() {
  useAnimatedBackgroundGradient();
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh"
    }}>
      <div style={{
        width: 40,
        height: 40,
        border: "6px solid #e0e0e0",
        borderTop: "6px solid #3f51b5",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }} />
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const container = document.getElementById("root");
if (!container) throw new Error("Root container missing in index.html");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Suspense fallback={<SuspenseFallback />}>
      <App />
    </Suspense>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
