import { ForgotPasswordController } from "@satay/controller";
import * as React from "react";

import { ForgotPasswordView } from "./ui/ForgotPasswordView";
import { RouteComponentProps } from "react-router";

export class ForgotPasswordConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    this.props.history.push("/m/reset-password", {
      message: "Check your email to reset your password."
    });
  };

  render() {
    return (
      <ForgotPasswordController>
        {({ submit }) => (
          <ForgotPasswordView onFinish={this.onFinish} submit={submit} />
        )}
      </ForgotPasswordController>
    );
  }
}
