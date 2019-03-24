import gql from "graphql-tag";
import * as React from "react";
import {
  ChildProps,
  graphql,
  withApollo,
  WithApolloClient
} from "react-apollo";

import { NormalizedErrorMap } from "../../types/NormalizedErrorMap";
import { normalizeErrors } from "../../utils/normalizeErrors";
import { LoginMutationVariables, LoginMutation } from "../../schemaTypes";

interface Props {
  children: (data: {
    submit: (
      values: LoginMutationVariables
    ) => Promise<NormalizedErrorMap | null>;
  }) => JSX.Element | null;
  onSessionId?: (sessionId: string) => void;
}

class C extends React.PureComponent<
  ChildProps<WithApolloClient<Props>, LoginMutation, LoginMutationVariables>
> {
  submit = async (values: LoginMutationVariables) => {
    if (!this.props.mutate) {
      throw new Error("Cannot find mutate on LoginController props");
    }

    const response = await this.props.mutate({
      variables: values
    });

    if (response !== undefined) {
      const { data } = response;
      if (data && data.login) {
        const { errors, sessionId } = data.login;

        if (errors) {
          return normalizeErrors(errors);
        }

        if (this.props.onSessionId && sessionId) {
          this.props.onSessionId(sessionId);
        }
      }
    }

    this.props.client.resetStore();

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
  LoginMutationVariables
>(loginMutation)(withApollo(C));
