import gql from "graphql-tag";
import * as React from "react";
import { ChildProps, graphql } from "react-apollo";

import { normalizeErrors } from "../../utils/normalizeErrors";
import { NormalizedErrorMap } from "../../types/NormalizedErrorMap";
import {
  ForgotPasswordChangeMutationVariables,
  ForgotPasswordChangeMutation
} from "../../schemaTypes";

interface Props {
  children: (data: {
    submit: (
      values: ForgotPasswordChangeMutationVariables
    ) => Promise<NormalizedErrorMap | null>;
  }) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildProps<
    Props,
    ForgotPasswordChangeMutation,
    ForgotPasswordChangeMutationVariables
  >
> {
  submit = async (values: ForgotPasswordChangeMutationVariables) => {
    if (!this.props.mutate) {
      throw new Error("Cannot find mutate on ChangePasswordController props");
    }
    const response = await this.props.mutate({
      variables: values
    });
    if (response) {
      const { data } = response;
      if (data && data.forgotPasswordChange) {
        return normalizeErrors(data.forgotPasswordChange);
      }
    }
    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const forgotPasswordChangeMutation = gql`
  mutation ForgotPasswordChangeMutation($newPassword: String!, $key: String!) {
    forgotPasswordChange(newPassword: $newPassword, key: $key) {
      path
      message
    }
  }
`;

export const ChangePasswordController = graphql<
  Props,
  ForgotPasswordChangeMutation,
  ForgotPasswordChangeMutationVariables
>(forgotPasswordChangeMutation)(C);
