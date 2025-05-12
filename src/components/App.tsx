import "../App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GameRoom } from "./gameplay/GameRoom";
import { CenteredColumn } from "./common/LayoutElements";
import { CommonFooter } from "./common/CommonFooter";
import { LandingPage } from "./common/LandingPage";

function App() {
  return (
    <CenteredColumn style={{ minHeight: "100vh", justifyContent: "flex-start" }}>
        <BrowserRouter>
          <Switch>
            <Route path="/:roomId">
              <GameRoom />
            </Route>
            <Route path="/">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
              <LandingPage />
            </div>
            </Route>
          </Switch>
        </BrowserRouter>
      <div style={{ width: "100%", marginTop: "auto" }}>
        <CommonFooter />
      </div>
    </CenteredColumn>
  );
}

export default App;
