import { FindProjectsQuery_findProjects } from "@faas/controller";
import { Icon, Menu } from "antd";
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

interface Props {
  action: string;
  path: string;
  projects: FindProjectsQuery_findProjects[];
}

export class OverviewMenu extends PureComponent<Props> {
  render() {
    const selectedKeys: string[] = [];
    if (this.props.action === "create-project") {
      selectedKeys.push("new-project");
    }
    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={["projects"]}
        selectedKeys={selectedKeys}
      >
        <SubMenu key="projects" title="Projects">
          {this.props.projects.map(({ title, serviceName }) => (
            <Menu.Item key={serviceName}>
              <Link to={`/projects/${serviceName}`}>{title}</Link>
            </Menu.Item>
          ))}
          <Menu.Item key="new-project">
            <Link to="/overview/create-project">
              <span>
                <Icon type="plus" />
                New Project
              </span>
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="account" title="Account">
          <Menu.Item key="profile">Profile</Menu.Item>
          <Menu.Item key="billing">Billing</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
