import gql from "graphql-tag";
import * as React from "react";
import { Mutation } from "react-apollo";

import {
  DeployProjectMutation,
  DeployProjectMutationVariables
} from "../../schemaTypes";

interface Props {
  children: (data: {
    deployProject: (
      variables: DeployProjectMutationVariables
    ) => Promise<boolean>;
  }) => JSX.Element | null;
}

export const DeployProjectController: React.SFC<Props> = ({ children }) => (
  <Mutation<DeployProjectMutation> mutation={deployProjectMutation}>
    {mutate =>
      children({
        deployProject: async variables => {
          const result = await mutate({
            variables
          });
          if (result && result.data) {
            return result.data.deployProject;
          }
          return false;
        }
      })
    }
  </Mutation>
);

const deployProjectMutation = gql`
  mutation DeployProjectMutation($id: String!) {
    deployProject(id: $id)
  }
`;
