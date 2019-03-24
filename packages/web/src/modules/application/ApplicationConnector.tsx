import React, { PureComponent } from "react";
import ApplicationView from "./ui/ApplicationView";
import { RouteComponentProps } from "react-router";
import { FindResourcesController } from "@faas/controller";

export class ApplicationConnector extends PureComponent<
  RouteComponentProps<{ serviceName: string }>
> {
  render() {
    const {
      match: {
        params: { serviceName }
      }
    } = this.props;
    return (
      <FindResourcesController serviceName={serviceName}>
        {({ findResources }) => (
          <ApplicationView
            serviceName={serviceName}
            uri={`${process.env.REACT_APP_PRISMA_URL}/${serviceName}/dev`}
            resources={findResources}
          />
        )}
      </FindResourcesController>
    );
  }
}
