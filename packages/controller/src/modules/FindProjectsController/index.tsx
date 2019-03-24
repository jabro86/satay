import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { FindProjectsQuery } from "../../schemaTypes";

const findProjectsQuery = gql`
  query FindProjectsQuery {
    findProjects {
      id
      title
      description
      serviceName
    }
  }
`;

interface Props {
  children: (projects: FindProjectsQuery) => JSX.Element | null;
}

export const FindProjectsController: React.SFC<Props> = ({ children }) => (
  <Query<FindProjectsQuery> query={findProjectsQuery}>
    {({ data, loading }) => {
      if (data === undefined || loading) {
        return children({ findProjects: [] });
      }

      return children(data);
    }}
  </Query>
);
