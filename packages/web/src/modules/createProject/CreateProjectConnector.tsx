import React, { PureComponent } from "react";
import { RouteComponentProps } from "react-router-dom";

import { CreateProjectView } from "./ui/CreateProjectView";

export class CreateProjectConnector extends PureComponent<RouteComponentProps> {
  navigateToProject = (serviceName: string) => {
    this.props.history.push(`/projects/${serviceName}`);
  };

  render() {
    return <CreateProjectView onProjectCreated={this.navigateToProject} />;
  }
}
