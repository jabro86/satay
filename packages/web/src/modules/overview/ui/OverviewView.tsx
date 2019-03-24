import { FindProjectsQuery_findProjects } from "@faas/controller";
import { Col, Row } from "antd";
import React from "react";

import { Layout } from "../../layout";
import { Routes } from "../routes";
import { OverviewMenu } from "./OverviewMenu";

interface Props {
  action: string;
  path: string;
  projects: FindProjectsQuery_findProjects[];
}

export class OverviewView extends React.Component<Props> {
  render() {
    return (
      <Layout
        menu={
          <OverviewMenu
            path={this.props.path}
            action={this.props.action}
            projects={this.props.projects}
          />
        }
        header={
          <Row>
            <Col span={20}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ textAlign: "center", marginLeft: "20px" }}>
                  Overview
                </div>
              </div>
            </Col>
          </Row>
        }
      >
        <Routes />
      </Layout>
    );
  }
}
