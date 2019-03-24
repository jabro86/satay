import { FindProjectsController } from "@faas/controller";
import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { OverviewView } from "./ui/OverviewView";

export class OverviewConnector extends React.PureComponent<
  RouteComponentProps<{ overviewAction: string }>
> {
  render() {
    const {
      match: {
        path,
        params: { overviewAction }
      }
    } = this.props;
    return (
      <FindProjectsController>
        {({ findProjects }) => (
          <OverviewView
            path={path}
            action={overviewAction}
            projects={findProjects}
          />
        )}
      </FindProjectsController>
    );
  }
}
