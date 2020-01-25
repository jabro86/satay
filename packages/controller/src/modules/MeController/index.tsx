import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";

import { MeQuery } from "../../schemaTypes";

interface Props {
  children: (data: { email?: string }) => JSX.Element | null;
}

export const MeController: React.SFC<Props> = ({ children }) => (
  <Query<MeQuery> query={meQuery}>
    {query =>
      children({
        email: query.data?.me?.email
      })
    }
  </Query>
);

const meQuery = gql`
  query {
    me {
      id
      email
    }
  }
`;
