import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  Route,
  Link,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

const routing = (
  <Router>
    <Switch>
      <Route exact path="/page=:number" component={App} />
      <Redirect from="*" to="/page=0" />
      <Redirect from="*/page/*" to="/page/0" />
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
