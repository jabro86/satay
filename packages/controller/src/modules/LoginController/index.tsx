import gql from "graphql-tag";
import * as React from "react";
import { ChildMutateProps, graphql } from "react-apollo";

import { LoginMutation, LoginMutationVariables } from "../../schemaTypes";
import { NormalizedErrorMap } from "../../types/NormalizedErrorMap";
import { normalizeErrors } from "../../utils/normalizeErrors";

interface Props {
  children: (data: {
    submit: (
      values: LoginMutationVariables
    ) => Promise<NormalizedErrorMap | null>;
  }) => JSX.Element | null;
  onSessionId?: (sessionId: string) => void;
}

class C extends React.PureComponent<
  ChildMutateProps<Props, LoginMutation, LoginMutationVariables>
> {
  submit = async (values: LoginMutationVariables) => {
    if (this.props.mutate === undefined) {
      throw new Error("No mutate function.");
    }
    const response = await this.props.mutate({
      variables: values
    });

    if (response) {
      const { data } = response;
      if (data && data.login) {
        const {
          login: { errors, sessionId }
        } = data;

        if (errors) {
          return normalizeErrors(errors);
        }

        if (sessionId && this.props.onSessionId) {
          this.props.onSessionId(sessionId);
        }
      }
    }

    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}
const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      errors {
        path
        message
      }
      sessionId
    }
  }
`;

export const LoginController = graphql<
  Props,
  LoginMutation,
  LoginMutationVariables,
  ChildMutateProps<Props, LoginMutation, LoginMutationVariables>
>(loginMutation)(C);
