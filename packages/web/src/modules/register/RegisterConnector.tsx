import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { RegisterController } from "@satay/controller";

import { RegisterView } from "./ui/RegisterView";

export class RegisterConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    this.props.history.push("/m/confirm-email", {
      message: "Check your email to confirm your account."
    });
  };

  render() {
    return (
      <RegisterController>
        {({ submit }) => (
          <RegisterView onFinish={this.onFinish} submit={submit} />
        )}
      </RegisterController>
    );
  }
}
