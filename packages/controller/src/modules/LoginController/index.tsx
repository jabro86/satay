import gql from "graphql-tag";
import * as React from "react";
import {
  ChildProps,
  graphql,
  withApollo,
  WithApolloClient
} from "react-apollo";

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
  ChildProps<WithApolloClient<Props>, LoginMutation, LoginMutationVariables>
> {
  submit = async (values: LoginMutationVariables) => {
    console.log(values);
    if (this.props.mutate === undefined) {
      throw new Error("No mutate function.");
    }
    const {
      data: { login }
    }: any = await this.props.mutate({
      variables: values
    });
    console.log("response: ", login);

    if (login) {
      // show errors
      // [{path: 'email': message: 'inval...'}]
      // {email: 'invalid....'}
      return normalizeErrors(login);
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
      path
      message
    }
  }
`;

export const LoginController = graphql<
  Props,
  LoginMutation,
  LoginMutationVariables
>(loginMutation)(withApollo(C));
