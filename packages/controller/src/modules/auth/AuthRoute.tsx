import gql from "graphql-tag";
import * as React from "react";
import { ChildProps, graphql } from "react-apollo";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";

import { MeQuery } from "../../schemaTypes";

interface Props extends RouteProps {
  additionalProps?: object;
}

export class C extends React.PureComponent<ChildProps<Props, MeQuery>> {
  renderRoute = (routeProps: RouteComponentProps<{}>) => {
    const { data, component: Component, additionalProps } = this.props;

    if (!data || data.loading || !Component) {
      return null;
    }

    const { me } = data;
    if (!me) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { next: routeProps.location.pathname }
          }}
        />
      );
    }

    return <Component {...routeProps} {...additionalProps} />;
  };

  render() {
    const { data: _, component: __, ...rest } = this.props;
    return <Route {...rest} render={this.renderRoute} />;
  }
}

const meQuery = gql`
  query MeQuery {
    me {
      email
    }
  }
`;

export const AuthRoute = graphql<Props, MeQuery>(meQuery)(C);
