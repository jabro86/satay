import React, { PureComponent } from "react";
import { RouteComponentProps } from "react-router";

import { CreateResourceView } from "./ui/CreateResourceView";

interface Props {
  serviceName: string;
}

export class CreateResourceConnector extends PureComponent<
  Props & RouteComponentProps
> {
  onResourceCreatedOrCanceled = () => {
    this.props.history.push(`/projects/${this.props.serviceName}/resources`);
  };

  render() {
    return (
      <CreateResourceView
        serviceName={this.props.serviceName}
        onCancel={this.onResourceCreatedOrCanceled}
        onResourceCreated={this.onResourceCreatedOrCanceled}
      />
    );
  }
}
