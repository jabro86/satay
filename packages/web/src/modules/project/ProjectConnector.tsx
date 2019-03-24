import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { ProjectView } from "./ui/ProjectView";
import {
  FindProjectsController,
  DeployProjectController
} from "@faas/controller";

export class ProjectConnector extends React.PureComponent<
  RouteComponentProps<{ serviceName: string }>
> {
  handleFinishDeleteProject = () => {
    this.props.history.push("/overview");
  };

  handleFinishDeployProject = () => {
    console.log("Project has been deployed");
  };

  render() {
    const {
      match: { params },
      location: { pathname }
    } = this.props;

    const pathnames = pathname.split("/");
    const index = pathnames.findIndex(value => value === params.serviceName) + 1;
    const selectedMenuItem = pathnames[index];

    return (
      <DeployProjectController>
        {({ deployProject }) => (
          <FindProjectsController>
            {({ findProjects }) => (
              <ProjectView
                selectedMenuItem={selectedMenuItem}
                project={findProjects.find(
                  ({ serviceName }) => serviceName === params.serviceName
                )}
                onFinishDeleteProject={this.handleFinishDeleteProject}
                deployProject={deployProject}
                onFinishDeployProject={this.handleFinishDeployProject}
              />
            )}
          </FindProjectsController>
        )}
      </DeployProjectController>
    );
  }
}
