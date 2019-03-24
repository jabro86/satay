import { Content } from "@faas/common";
import { CreateResourceProps, withCreateResource } from "@faas/controller";
import React from "react";

import { ResourceDesigner } from "../../ResourceDesigner";

interface FormValues {
  name: string;
  content: Content;
}

interface Props {
  serviceName: string;
  onResourceCreated: () => void;
  onCancel: () => void;
}

class C extends React.Component<Props & CreateResourceProps> {
  submit = async ({ name, content }: FormValues) => {
    const { serviceName, onResourceCreated, createResource } = this.props;
    await createResource({
      serviceName,
      name,
      content
    });
    onResourceCreated();
  };
  render() {
    return <ResourceDesigner name="New Resource" />;
  }
}

export const CreateResourceView: React.ComponentClass<
  Props
> = withCreateResource(C);
