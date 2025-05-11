import "../App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GameRoom } from "./gameplay/GameRoom";
import { CenteredColumn } from "./common/LayoutElements";
import { CommonFooter } from "./common/CommonFooter";
import { LandingPage } from "./common/LandingPage";

const style: React.CSSProperties = {
  maxWidth: 800,
  margin: 16,
  padding: 16,
  borderRadius: 16,
  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
  background: "#fff",
};

function App() {
  return (
    <CenteredColumn style={{ minHeight: "100vh", justifyContent: "flex-start" }}>
      <div style={{ ...style, flex: 1, width: "100%", maxHeight: 500, overflow: "auto" }}>
        <BrowserRouter>
          <Switch>
            <Route path="/:roomId">
              <GameRoom />
            </Route>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
      <div style={{ width: "100%", marginTop: "auto" }}>
        <CommonFooter />
      </div>
    </CenteredColumn>
  );
}

export default App;
