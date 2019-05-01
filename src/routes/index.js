import React from "react";

import { Switch, Route } from "react-router-dom";

import Login from "../pages/login";
import Session from "../pages/session";
import User from "../pages/user";

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/session" component={Session} />
        <Route path="/user" component={User} />
    </Switch>
);

export default Routes;
