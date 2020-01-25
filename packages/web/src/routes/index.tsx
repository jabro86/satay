import { AuthRoute } from "@satay/controller";
import * as React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ChangePasswordConnector } from "../modules/changePassword/ChangePasswordConnector";
import { ForgotPasswordConnector } from "../modules/forgotPassword/ForgotPasswordConnector";
import { HomeConnector } from "../modules/home/HomeConnector";
import { LoginConnector } from "../modules/login/LoginConnector";
import { Logout } from "../modules/logout";
import { RegisterConnector } from "../modules/register/RegisterConnector";
import { TextPage } from "../modules/TextPage";
import { CreateTrainingConnector } from "../modules/training/create/CreateTrainingConnector";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <AuthRoute path="/h" component={HomeConnector} />
      <Route path="/m" component={TextPage} />
      <Route exact path="/register" component={RegisterConnector} />
      <Route exact path="/login" component={LoginConnector} />
      <Route exact path="/logout" component={Logout} />
      <Route
        exact
        path="/forgot-password"
        component={ForgotPasswordConnector}
      />
      <Route
        exact
        path="/change-password/:key"
        component={ChangePasswordConnector}
      />
      <AuthRoute path="/create-training" component={CreateTrainingConnector} />
      <Route path="/m" component={TextPage} />
      <Route component={() => <Redirect to="/h" />} />
    </Switch>
  </BrowserRouter>
);

export { Routes };
