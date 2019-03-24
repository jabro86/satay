import { AuthRoute } from "@faas/controller";
import * as React from "react";

import { ResourcesConnector } from "../../resources/ResourcesConnector";

interface Props {
  serviceName: string;
}

const Routes: React.SFC<Props> = ({ serviceName }) => (
  <>
    <AuthRoute exact path={`/projects/${serviceName}`} component={() => null} />
    <AuthRoute
      exact
      path={`/projects/${serviceName}/resources/:resourceId?`}
      additionalProps={{ serviceName }}
      component={ResourcesConnector}
    />
  </>
);

export { Routes };
