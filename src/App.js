import "./App.css";
import Characters from "./containers/Characters";
import Comics from "./containers/Comics";
import Perso from "./containers/Perso";
import Favorites from "./containers/Favorites";
import Header from "./components/Header";
import Home from "./containers/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [favPerso, setFavPerso] = useState([]);
  const [favComic, setFavComic] = useState([]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/characters">
          <Characters favPerso={favPerso} setFavPerso={setFavPerso} />
        </Route>
        <Route path="/comics/:characterId">
          <Perso />
        </Route>
        <Route path="/comics">
          <Comics favComic={favComic} setFavComic={setFavComic} />
        </Route>
        <Route path="/favorites">
          <Favorites favPerso={favPerso} favComic={favComic} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
