import { AuthRoute } from "@satay/controller";
import { Icon, Layout, Menu, Button, Dropdown } from "antd";
import React from "react";
import { Switch, Link } from "react-router-dom";
import { RouteComponentProps } from "react-router";

const { Header, Sider, Content } = Layout;

interface Props {
  user: { email: string };
}

export class Home extends React.Component<
  Props & Partial<RouteComponentProps>
> {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { match, history, location, user } = this.props;
    const { path } = match || { path: "" };
    const { pathname } = location || { pathname: "/" };
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
          <div
            className="logo"
            onClick={() => {
              history?.push(path);
            }}
            style={{ cursor: "pointer" }}
          />
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={selectedMainMenu ? [selectedMainMenu] : []}
            onSelect={({ key }) => {
              history?.push(`${path}/${key}`);
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
                <div style={{ margin: "0 8px 8px 0" }}>
                  <Dropdown
                    overlay={
                      <Menu
                        onClick={({ key }) => {
                          history?.push(`/${key}`);
                        }}
                      >
                        <Menu.Item key="logout">
                          <Icon type="logout" />
                          Logout
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <Button>
                      <span>{user.email}</span>
                      <Icon type="user" />
                    </Button>
                  </Dropdown>
                </div>
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
                path={`${path}/training`}
                component={() => <h1>Aktiver Trainingsplan</h1>}
              />
              <AuthRoute
                path={`${path}/plans`}
                component={() => <h1>Alle Pläne</h1>}
              />
              <AuthRoute
                path={`${path}/settings`}
                component={() => <h1>Einstellungen</h1>}
              />
              <AuthRoute
                path={`${path}/excercises/new`}
                component={() => <h1>Neue Übung anlegen</h1>}
              />
              <AuthRoute
                path={`${path}/excercises`}
                component={() => (
                  <div>
                    <h1>Alle Übungen</h1>
                    <Link to={`${path}/excercises/new`}>
                      <Button>Neue Übung</Button>
                    </Link>
                  </div>
                )}
              />
              <AuthRoute
                path={path}
                component={() => <h1>Willkommen {user.email}!</h1>}
              />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
