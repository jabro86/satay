import {
  DeleteResourceProps,
  FindResourcesQuery_findResources,
  withDeleteResource
} from "@faas/controller";
import { Button, Divider, PageHeader, Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import React from "react";

import { CreateResourceView } from "../../createResource/ui/CreateResourceView";

interface Props {
  serviceName: string;
  resourceId: string | undefined;
  resources: FindResourcesQuery_findResources[];
  onResourceCreated: () => void;
  onResourcesClick: () => void;
  onNewResourceClick: () => void;
  onNewResourceCanceled: () => void;
  onResourceClick: (resourceId: string) => void;
}

interface IResource {
  key: string;
  name: string;
}

interface StateType {
  resourceState: "idle" | "error" | string;
}

class C extends React.Component<Props & DeleteResourceProps, StateType> {
  state: StateType = {
    resourceState: "idle"
  };

  handleDeleteResource = async (resourceId: string) => {
    try {
      this.setState({ resourceState: `deleting ${resourceId}` });
      const { serviceName, deleteResource } = this.props;
      await deleteResource({ serviceName, id: resourceId });
      this.setState({ resourceState: "idle" });
    } catch (error) {
      this.setState({ resourceState: "error" });
    }
  };

  render() {
    const {
      serviceName,
      resourceId,
      resources,
      onResourceCreated,
      onNewResourceCanceled,
      onResourcesClick,
      onNewResourceClick,
      onResourceClick
    } = this.props;

    const columns: Array<ColumnProps<IResource>> = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Action",
        key: "action",
        render: (text, { key: currentResourceId }) => (
          <span>
            <Button
              icon="edit"
              onClick={() => onResourceClick(currentResourceId)}
            />
            <Divider type="vertical" />
            <Button
              icon="delete"
              onClick={() => this.handleDeleteResource(currentResourceId)}
              loading={
                this.state.resourceState === `deleting ${currentResourceId}`
              }
            />
          </span>
        )
      }
    ];

    const data = resources.map<IResource>(({ id, name }) => ({
      key: id,
      name
    }));

    const title =
      resourceId === undefined
        ? "Resources"
        : resourceId === "new"
        ? "New Resource"
        : `Edit ${
            (
              resources.find(resource => resource.id === resourceId) || {
                name: "unknown"
              }
            ).name
          }`;
    const onBack = resourceId !== undefined ? onResourcesClick : undefined;
    return (
      <>
        <PageHeader title={title} onBack={onBack} />
        <div
          style={{
            paddingLeft: "32px",
            paddingRight: "32px"
          }}
        >
          {resourceId === undefined ? (
            <Table<IResource>
              columns={columns}
              dataSource={data}
              size="small"
              pagination={false}
              footer={() => (
                <Button icon="plus" type="primary" onClick={onNewResourceClick}>
                  New Resource
                </Button>
              )}
            />
          ) : resourceId === "new" ? (
            <>
              <CreateResourceView
                serviceName={serviceName}
                onCancel={onNewResourceCanceled}
                onResourceCreated={onResourceCreated}
              />
            </>
          ) : (
            <div>Edit resource: {resourceId}</div>
          )}
        </div>
      </>
    );
  }
}

export const ResourcesView: React.ComponentClass<Props> = withDeleteResource(C);
