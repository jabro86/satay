import gql from "graphql-tag";
import * as React from "react";
import { ChildProps, graphql } from "react-apollo";

import { NormalizedErrorMap } from "../../types/NormalizedErrorMap";
import { normalizeErrors } from "../../utils/normalizeErrors";
import { RegisterMutationVariables, RegisterMutation } from "../../schemaTypes";

interface Props {
  children: (data: {
    submit: (
      values: RegisterMutationVariables
    ) => Promise<NormalizedErrorMap | null>;
  }) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildProps<Props, RegisterMutation, RegisterMutationVariables>
> {
  submit = async (values: RegisterMutationVariables) => {
    if (!this.props.mutate) {
      throw new Error("Cannot find mutate on RegisterController props");
    }

    const response = await this.props.mutate({
      variables: values
    });
    if (response) {
      const { data } = response;
      if (data && data.register) {
        return normalizeErrors(data.register);
      }
    }
    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      path
      message
    }
  }
`;

export const RegisterController = graphql<
  Props,
  RegisterMutation,
  RegisterMutationVariables
>(registerMutation)(C);
