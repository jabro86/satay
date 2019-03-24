import React, { PureComponent } from "react";
import { LogoutController } from "@faas/controller";
import CallLogout from "./CallLogout";
import { RouteComponentProps } from "react-router";

export class Logout extends PureComponent<RouteComponentProps> {
  onFinish = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <LogoutController>
        {({ logout }) => (
          <CallLogout logout={logout} onFinish={this.onFinish} />
        )}
      </LogoutController>
    );
  }
}
