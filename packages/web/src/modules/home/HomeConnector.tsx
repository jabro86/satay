import { MeController } from "@satay/controller";
import React from "react";
import { RouteComponentProps } from "react-router";

import { Home } from "./ui";

export class HomeConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  render() {
    return (
      <MeController>
        {({ email }) => <Home user={{ email: email || "" }} {...this.props} />}
      </MeController>
    );
  }
}
