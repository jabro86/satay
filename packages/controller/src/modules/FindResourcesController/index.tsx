import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import {
  FindResourcesQuery,
  FindResourcesQueryVariables
} from "../../schemaTypes";

const findResourcesQuery = gql`
  query FindResourcesQuery($serviceName: String!) {
    findResources(serviceName: $serviceName) {
      id
      name
      content {
        attributes {
          name
          type
          required
          unique
        }
      }
    }
  }
`;

interface Props {
  serviceName: string;
  children: (resources: FindResourcesQuery) => JSX.Element | null;
}

export const FindResourcesController: React.SFC<Props> = ({
  children,
  serviceName
}) => (
  <Query<FindResourcesQuery, FindResourcesQueryVariables>
    query={findResourcesQuery}
    variables={{ serviceName }}
    
  >
    {({ data, loading }) => {
      if (data === undefined || loading) {
        return children({ findResources: [] });
      }

      return children(data);
    }}
  </Query>
);
