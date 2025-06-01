import "../App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GameRoom } from "./gameplay/GameRoom";
import { CenteredColumn } from "./common/LayoutElements";
import { CommonFooter } from "./common/CommonFooter";
import { LandingPage } from "./common/LandingPage";

function App() {
  return (
    <CenteredColumn style={{ justifyContent: "flex-start" }}>
        <BrowserRouter>
          <Switch>
            <Route path="/:roomId">
              <GameRoom />
            </Route>
            <Route path="/">
            <div className="landing-container">
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
