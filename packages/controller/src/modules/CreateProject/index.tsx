import gql from "graphql-tag";
import { graphql } from "react-apollo";
import {
  CreateProjectMutation,
  CreateProjectMutationVariables
} from "../../schemaTypes";

const createProjectMutation = gql`
  mutation CreateProjectMutation($title: String!, $description: String!) {
    createProject(input: { title: $title, description: $description }) {
      id
      title
      description
      serviceName
    }
  }
`;

export interface CreateProjectProps {
  createProject: (
    variables: CreateProjectMutationVariables
  ) => Promise<string | undefined>;
}

export const withCreateProject = graphql<
  any,
  CreateProjectMutation,
  CreateProjectMutationVariables,
  CreateProjectProps
>(createProjectMutation, {
  props: ({ mutate }) => ({
    createProject: async variables => {
      if (!mutate) {
        return;
      }
      const response = await mutate({
        variables,
        refetchQueries: ["FindProjectsQuery"]
      });

      if (response && response.data) {
        return response.data.createProject.serviceName;
      }
      return undefined;
    }
  })
});
