import gql from "graphql-tag";
import * as React from "react";
import { ChildProps, graphql } from "react-apollo";

import {
  SendForgotPasswordEmailMutation,
  SendForgotPasswordEmailMutationVariables
} from "../../schemaTypes";

interface Props {
  children: (data: {
    submit: (values: SendForgotPasswordEmailMutationVariables) => Promise<null>;
  }) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildProps<
    Props,
    SendForgotPasswordEmailMutation,
    SendForgotPasswordEmailMutationVariables
  >
> {
  submit = async (values: SendForgotPasswordEmailMutationVariables) => {
    if (!this.props.mutate) {
      throw new Error("Cannot find mutate on ForgotPasswordController props");
    }
    await this.props.mutate({
      variables: values
    });
    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const forgotPasswordMutation = gql`
  mutation SendForgotPasswordEmailMutation($email: String!) {
    sendForgotPasswordEmail(email: $email)
  }
`;

export const ForgotPasswordController = graphql<
  Props,
  SendForgotPasswordEmailMutation,
  SendForgotPasswordEmailMutationVariables
>(forgotPasswordMutation)(C);
