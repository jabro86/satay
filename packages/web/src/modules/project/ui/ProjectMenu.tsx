import { Icon, Menu, Button } from "antd";
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

interface Props {
  serviceName: string;
  selectedMenuItem: string;
}

export class ProjectMenu extends PureComponent<Props> {
  render() {
    const { selectedMenuItem } = this.props;
    return (
      <Menu theme="dark" mode="inline" selectedKeys={[selectedMenuItem]}>
        <Menu.Item key="resources">
          <Link to={`/projects/${this.props.serviceName}/resources`}>
            Resources
          </Link>
        </Menu.Item>
        <Menu.Item key="views">Views</Menu.Item>
        <Menu.Item key="settings">Settings</Menu.Item>
        <Menu.Item key="back-to-projects">
          <Link to="/overview">
            <Button>Back to Overview</Button>
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}
