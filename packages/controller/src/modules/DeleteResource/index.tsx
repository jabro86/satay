import gql from "graphql-tag";
import { graphql } from "react-apollo";

import {
  DeleteResourceMutation,
  DeleteResourceMutationVariables
} from "../../schemaTypes";

const deleteProjectMutation = gql`
  mutation DeleteResourceMutation($serviceName: String!, $id: String!) {
    deleteResource(input: { serviceName: $serviceName, id: $id })
  }
`;

export interface DeleteResourceProps {
  deleteResource: (variables: DeleteResourceMutationVariables) => Promise<void>;
}

export const withDeleteResource = graphql<
  any,
  DeleteResourceMutation,
  DeleteResourceMutationVariables,
  DeleteResourceProps
>(deleteProjectMutation, {
  props: ({ mutate }) => ({
    deleteResource: async variables => {
      if (!mutate) {
        return;
      }
      await mutate({
        variables,
        refetchQueries: ["FindResourcesQuery"]
      });
    }
  })
});
