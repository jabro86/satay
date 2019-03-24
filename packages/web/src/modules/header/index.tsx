import { Col, Icon, Layout, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  children?: JSX.Element;
}

export class Header extends React.PureComponent<Props> {
  render() {
    return (
      <Layout.Header style={{ background: "#fff", padding: 0 }}>
        <Row type="flex" justify="end">
          <Col span={20}>{this.props.children}</Col>
          <Col span={4}>
            <div style={{ display: "flex" }}>
              <div style={{ margin: "auto" }}>
                <Icon type="user" />
                <Link to="/logout" style={{ marginLeft: "5px" }}>
                  Logout
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Layout.Header>
    );
  }
}
