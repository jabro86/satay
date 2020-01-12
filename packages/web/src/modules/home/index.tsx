import { Layout, Menu, Icon } from "antd";
import React from "react";

const { Header, Sider, Content } = Layout;

export class Home extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Icon type="fire" />
              <span>Training</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="profile" />
              <span>Pläne</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="filter" />
              <span>Übungen</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="setting" />
              <span>Einstellungen</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <div style={{ display: "flex" }}>
              <Icon
                style={{ flexGrow: 0 }}
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexGrow: 1   
                }}
              >
                <Menu
                  mode="horizontal"
                  style={{ lineHeight: "64px" }}
                >
                  <Menu.Item key="1">
                    <Icon type="user" />
                    <span>User</span>
                  </Menu.Item>
                </Menu>
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}
