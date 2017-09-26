import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import App from "./App.jsx";
import TableOrganizer from "./TableOrganizer";
require("./app.scss");

ReactDOM.render(
  <Router history={hashHistory}>
    <Route exaxt path="/" component={App}>
      <Route path="/:tableId" component={TableOrganizer} />
    </Route>
  </Router>,
  document.getElementById("app")
);
