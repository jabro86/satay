import { Layout as AntLayout } from "antd";
import React, { PureComponent } from "react";

import Footer from "../footer";
import { Header } from "../header";

const { Sider, Content } = AntLayout;

interface Props {
  menu?: JSX.Element;
  header?: JSX.Element;
  children?: JSX.Element;
}

export class Layout extends PureComponent<Props> {
  render() {
    return (
      <AntLayout style={{ height: "100vh" }}>
        <Sider>
          <div className="logo" />
          {this.props.menu}
        </Sider>
        <AntLayout style={{ background: "#fff" }}>
          <Header>{this.props.header}</Header>
          <Content>{this.props.children}</Content>
          <Footer />
        </AntLayout>
      </AntLayout>
    );
  }
}
