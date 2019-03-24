import gql from "graphql-tag";
import { graphql } from "react-apollo";

import {
  DeleteProjectMutation,
  DeleteProjectMutationVariables
} from "../../schemaTypes";

const deleteProjectMutation = gql`
  mutation DeleteProjectMutation($id: String!) {
    deleteProject(id: $id)
  }
`;

export interface DeleteProjectProps {
  deleteProject: (variables: DeleteProjectMutationVariables) => Promise<void>;
}

export const withDeleteProject = graphql<
  any,
  DeleteProjectMutation,
  DeleteProjectMutationVariables,
  DeleteProjectProps
>(deleteProjectMutation, {
  props: ({ mutate }) => ({
    deleteProject: async variables => {
      if (!mutate) {
        return;
      }
      await mutate({
        variables,
        refetchQueries: ["FindProjectsQuery"]
      });
    }
  })
});
