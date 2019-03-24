import gql from "graphql-tag";
import { graphql } from "react-apollo";
import {
  CreateResourceMutation,
  CreateResourceMutationVariables
} from "../../schemaTypes";

const CreateResourceMutation = gql`
  mutation CreateResourceMutation(
    $serviceName: String!
    $name: String!
    $content: ContentInput!
  ) {
    createResource(
      input: { serviceName: $serviceName, name: $name, content: $content }
    )
  }
`;

export interface CreateResourceProps {
  createResource: (
    variables: CreateResourceMutationVariables
  ) => Promise<boolean>;
}

export const withCreateResource = graphql<
  any,
  CreateResourceMutation,
  CreateResourceMutationVariables,
  CreateResourceProps
>(CreateResourceMutation, {
  props: ({ mutate }) => ({
    createResource: async variables => {
      if (!mutate) {
        return false;
      }
      const response = await mutate({
        variables,
        refetchQueries: ["FindResourcesQuery"]
      });

      if (response && response.data) {
        return true;
      }
      return false;
    }
  })
});
