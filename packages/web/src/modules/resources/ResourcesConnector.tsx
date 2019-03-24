import React from "react";

import { ResourcesView } from "./ui/ResourcesView";
import { RouteComponentProps } from "react-router";
import { FindResourcesController } from "@faas/controller";

interface Props {
  serviceName: string;
}

export class ResourcesConnector extends React.PureComponent<
  Props & RouteComponentProps<{ resourceId: string | undefined }>
> {
  onResourceCreated = () => {
    this.props.history.push(`/projects/${this.props.serviceName}/resources`);
  };

  onResourcesClick = () => {
    this.props.history.push(`/projects/${this.props.serviceName}/resources`);
  };

  onNewResourceClick = () => {
    this.props.history.push(
      `/projects/${this.props.serviceName}/resources/new`
    );
  };

  onResourceClick = (resourceId: string) => {
    this.props.history.push(
      `/projects/${this.props.serviceName}/resources/${resourceId}`
    );
  };

  render() {
    const {
      serviceName,
      match: {
        params: { resourceId }
      }
    } = this.props;
    return (
      <FindResourcesController serviceName={serviceName}>
        {({ findResources }) => (
          <ResourcesView
            serviceName={serviceName}
            resourceId={resourceId}
            resources={findResources}
            onResourceCreated={this.onResourceCreated}
            onNewResourceClick={this.onNewResourceClick}
            onNewResourceCanceled={this.onResourcesClick}
            onResourcesClick={this.onResourcesClick}
            onResourceClick={this.onResourceClick}
          />
        )}
      </FindResourcesController>
    );
  }
}
