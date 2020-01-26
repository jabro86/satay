import { AuthRoute } from "@satay/controller";
import {
  Button,
  Dropdown,
  Icon,
  Layout,
  Menu,
  PageHeader,
  Breadcrumb
} from "antd";
import React from "react";
import { RouteComponentProps } from "react-router";
import { Link, Switch } from "react-router-dom";
import { CreateExcerciseConnector } from "../../excercise/create/CreateExcerciseConnector";

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
          <Content>
            <Switch>
              <AuthRoute
                path={`${path}/training`}
                component={() => (
                  <>
                    <Breadcrumb style={{ padding: "4px 24px" }}>
                      <Breadcrumb.Item key="home">
                        <Link to="/h">Home</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item key="training">
                        <Link to="/h">Training</Link>
                      </Breadcrumb.Item>
                    </Breadcrumb>
                    <PageHeader
                      style={{ padding: "4px 24px" }}
                      title="Aktiver Trainingsplan"
                    />
                  </>
                )}
              />
              <AuthRoute
                path={`${path}/plans`}
                component={() => (
                  <>
                    <Breadcrumb style={{ padding: "4px 24px" }}>
                      <Breadcrumb.Item key="home">
                        <Link to="/h">Home</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item key="plans">
                        <Link to="/h">Pläne</Link>
                      </Breadcrumb.Item>
                    </Breadcrumb>
                    <PageHeader
                      style={{ padding: "4px 24px" }}
                      title="Alle Pläne"
                    />
                  </>
                )}
              />
              <AuthRoute
                path={`${path}/settings`}
                component={() => (
                  <>
                    <Breadcrumb style={{ padding: "4px 24px" }}>
                      <Breadcrumb.Item key="home">
                        <Link to="/h">Home</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item key="settings">
                        <Link to="/h">Einstellungen</Link>
                      </Breadcrumb.Item>
                    </Breadcrumb>
                    <PageHeader
                      style={{ padding: "4px 24px" }}
                      title="Einstellungen"
                    />
                  </>
                )}
              />
              <AuthRoute
                path={`${path}/excercises/new`}
                component={CreateExcerciseConnector}
              />
              <AuthRoute
                path={`${path}/excercises`}
                component={() => (
                  <div>
                    <Breadcrumb style={{ padding: "4px 24px" }}>
                      <Breadcrumb.Item key="home">
                        <Link to="/h">Home</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item key="excercises">
                        <Link to="/h">Übungen</Link>
                      </Breadcrumb.Item>
                    </Breadcrumb>
                    <PageHeader
                      style={{ padding: "4px 24px" }}
                      title="Alle Übungen"
                    />
                    <div
                      style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280
                      }}
                    >
                      <Link to={`${path}/excercises/new`}>
                        <Button>Neue Übung</Button>
                      </Link>
                    </div>
                  </div>
                )}
              />

              <AuthRoute
                path={path}
                component={() => (
                  <>
                    <Breadcrumb style={{ padding: "4px 24px" }}>
                      <Breadcrumb.Item key="home">
                        <Link to="/h">Home</Link>
                      </Breadcrumb.Item>
                    </Breadcrumb>
                    <PageHeader
                      style={{ padding: "4px 24px" }}
                      title="Willkommen"
                    />
                    <div
                      style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280
                      }}
                    ></div>
                  </>
                )}
              />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
