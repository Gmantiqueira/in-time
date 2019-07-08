import React from "react";

import { Switch, Route } from "react-router-dom";

import Login from "../pages/login";
import Session from "../pages/session";
import User from "../pages/user";

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/:session" component={Session} />
        <Route exact path="/:session/user" component={User} />
    </Switch>
);

export default Routes;
