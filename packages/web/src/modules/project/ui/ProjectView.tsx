import {
  DeleteProjectProps,
  DeployProjectMutationVariables,
  FindProjectsQuery_findProjects,
  withDeleteProject
} from "@faas/controller";
import { Avatar, Button, Col, Popover, Row } from "antd";
import React from "react";

import { Layout } from "../../layout";
import { Routes } from "../routes";
import { ProjectMenu } from "./ProjectMenu";

interface Props {
  selectedMenuItem: string;
  project: FindProjectsQuery_findProjects | undefined;
  onFinishDeleteProject: () => void;
  deployProject: (
    variables: DeployProjectMutationVariables
  ) => Promise<boolean>;
  onFinishDeployProject: () => void;
}

interface StateType {
  projectState: "idle" | "deleting" | "deploying" | "error";
}

class C extends React.Component<Props & DeleteProjectProps, StateType> {
  state: StateType = {
    projectState: "idle"
  };

  handleDeleteProject = async () => {
    try {
      this.setState({ projectState: "deleting" });
      const { project, deleteProject, onFinishDeleteProject } = this.props;
      if (project) {
        await deleteProject({ id: project.id });
        this.setState({ projectState: "idle" });
        onFinishDeleteProject();
      } else {
        throw new Error(`No project found!`);
      }
    } catch (error) {
      this.setState({ projectState: "error" });
    }
  };

  handleDeployProject = async () => {
    const { project, deployProject, onFinishDeployProject } = this.props;
    if (project) {
      await deployProject({ id: project.id });
      onFinishDeployProject();
    }
  };

  render() {
    const { project, selectedMenuItem } = this.props;

    if (!project) {
      return null;
    }
    const hrefPlayground = `${process.env.REACT_APP_PRISMA_URL}/${
      project.serviceName
    }/dev`;
    const hrefApp = `${process.env.REACT_APP_FRONTEND_URL}/app/${
      project.serviceName
    }`;
    return (
      <Layout
        menu={
          <ProjectMenu
            serviceName={project.serviceName}
            selectedMenuItem={selectedMenuItem}
          />
        }
        header={
          <Row>
            <Col span={20}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ textAlign: "center", marginLeft: "20px" }}>
                  <Avatar
                    shape="square"
                    size="large"
                    icon="project"
                    style={{ backgroundColor: "#87d068" }}
                  />
                  <span style={{ marginLeft: "10px" }}>{project.title}</span>
                </div>
              </div>
            </Col>
            <Col span={4}>
              <Popover
                placement="bottom"
                title={<span>Project Settings</span>}
                content={
                  <div style={{ width: 150 }}>
                    <Button
                      style={{ marginBottom: "10px" }}
                      block
                      target="_blank"
                      href={hrefApp}
                    >
                      App
                    </Button>
                    <Button
                      style={{ marginBottom: "10px" }}
                      block
                      target="_blank"
                      href={hrefPlayground}
                    >
                      API Playground
                    </Button>
                    <Button
                      onClick={this.handleDeployProject}
                      block
                      style={{ marginBottom: "10px" }}
                    >
                      Deploy
                    </Button>
                    <Button
                      type="danger"
                      onClick={this.handleDeleteProject}
                      block
                      loading={this.state.projectState === "deleting"}
                    >
                      Delete
                    </Button>
                  </div>
                }
                trigger="click"
              >
                <Button type="primary" shape="circle" icon="setting" />
              </Popover>
            </Col>
          </Row>
        }
      >
        <Routes serviceName={project.serviceName} />
      </Layout>
    );
  }
}

export const ProjectView: React.ComponentClass<Props> = withDeleteProject(C);
