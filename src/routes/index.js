import React from "react";

import { Switch, Route } from "react-router-dom";

import Login from "../pages/login";
import Session from "../pages/session";

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/:session" component={Session} />
    </Switch>
);

export default Routes;
