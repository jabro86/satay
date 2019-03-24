import { AuthRoute } from "@faas/controller";
import * as React from "react";

import { CreateProjectConnector } from "../../createProject/CreateProjectConnector";

const Routes: React.SFC = () => (
  <>
    <AuthRoute exact path="overview" component={() => null} />
    <AuthRoute
      exact
      path="/overview/create-project"
      component={CreateProjectConnector}
    />
  </>
);

export { Routes };
