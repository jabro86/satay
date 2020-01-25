import { AuthRoute } from "@satay/controller";
import { Icon, Layout, Menu, Button } from "antd";
import React from "react";
import { Switch, Link } from "react-router-dom";
import { RouteComponentProps } from "react-router";

const { Header, Sider, Content } = Layout;

export class Home extends React.Component<RouteComponentProps> {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const {
      match: { path },
      history,
      location: { pathname }
    } = this.props;
    // Menu path is in the form of ["h", "excercises", "new"]
    const menuPath = pathname.split("/").filter(name => name !== "");
    const selectedMainMenu = menuPath.length > 1 ? menuPath[1] : undefined;
    return (
      <Layout style={{ height: "100%" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          theme="light"
        >
          <div className="logo" />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={selectedMainMenu ? [selectedMainMenu] : []}
            onSelect={({ key }) => {
              history.push(`${path}/${key}`);
            }}
          >
            <Menu.Item key="training">
              <Icon type="fire" />
              <span>Training</span>
            </Menu.Item>
            <Menu.Item key="plans">
              <Icon type="profile" />
              <span>Pläne</span>
            </Menu.Item>
            <Menu.Item key="excercises">
              <Icon type="filter" />
              <span>Übungen</span>
            </Menu.Item>
            <Menu.Item key="settings">
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
                <Menu mode="horizontal" style={{ lineHeight: "64px" }}>
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
            <Switch>
              <AuthRoute
                exact
                path={`${this.props.match.path}`}
                component={() => <h1>Willkommen</h1>}
              />
              <AuthRoute
                exact
                path={`${this.props.match.path}/excercises`}
                component={() => (
                  <div>
                    <h1>Alle Übungen</h1>
                    <Link to={`${this.props.match.path}/excercises/new`}>
                      <Button>Neue Übung</Button>
                    </Link>
                  </div>
                )}
              />
              <AuthRoute
                exact
                path={`${this.props.match.path}/excercises/new`}
                component={() => <h1>Neue Übung anlegen</h1>}
              />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
