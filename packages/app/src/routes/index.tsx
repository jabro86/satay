import * as React from "react";
import { NativeRouter, Route, Switch } from "react-router-native";

import { LoginConnector } from "../modules/login/LoginConnector";
import { RegisterConnector } from "../modules/register/RegisterConnector";

const Routes = () => (
  <NativeRouter initialEntries={["/login"]}>
    <Switch>
      <Route exact path="/register" component={RegisterConnector} />
      <Route exact path="/login" component={LoginConnector} />
    </Switch>
  </NativeRouter>
);

export { Routes };
