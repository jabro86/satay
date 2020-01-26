import { Button, Form as AntForm, PageHeader, Breadcrumb, Icon } from "antd";
import { Form, Formik } from "formik";
import React, { PureComponent } from "react";
import { RouteComponentProps } from "react-router";

import { Page1 } from "./ui/Page1";
import { Page2 } from "./ui/Page2";
import { Page3 } from "./ui/Page3";
import { Link } from "react-router-dom";
import ButtonGroup from "antd/lib/button/button-group";

interface FormValues {
  title: string;
  description: string;
  pictureUrlExcercise: string;
  videoUrlExcercise: string;
  stepsExcercise: string[];
  breathing: string;
  pictureUrlMuscles: string;
  listInvolvedMuscles: string[];
}

const pages = [<Page1 />, <Page2 />, <Page3 />];

interface State {
  page: number;
}

export class CreateExcerciseConnector extends PureComponent<
  RouteComponentProps<{}>,
  State
> {
  state: State = {
    page: 0
  };

  submit = (values: FormValues) => {
    console.log("TCL: submit -> values", values);
  };

  nextPage = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };
  previousPage = () => {
    this.setState(state => ({ page: state.page - 1 }));
  };

  render() {
    return (
      <>
        <Breadcrumb style={{ padding: "4px 24px" }}>
          <Breadcrumb.Item key="home">
            <Link to="/h">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item key="excercises">
            <Link to="/h/excercises">Übungen</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item key="excercises-new">
            <Link to="/h/excercises/new">Neue Übung</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <PageHeader style={{ padding: "4px 24px" }} title="Neue Übung" />
        <div
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280
          }}
        >
          <Formik<FormValues>
            initialValues={{
              title: "",
              description: "",
              breathing: "",
              listInvolvedMuscles: [],
              pictureUrlExcercise: "",
              pictureUrlMuscles: "",
              stepsExcercise: [],
              videoUrlExcercise: ""
            }}
            onSubmit={this.submit}
          >
            {() => (
              <Form style={{ display: "flex" }}>
                <div style={{ width: "100%" }}>
                  <div style={{ minHeight: "300px" }}>
                    {pages[this.state.page]}
                  </div>

                  <AntForm.Item wrapperCol={{ span: 12, offset: 4 }}>
                    {this.state.page === pages.length - 1 ? (
                      <div>
                        <ButtonGroup style={{ marginRight: "8px" }}>
                          <Button type="primary" onClick={this.previousPage}>
                            <Icon type="left"></Icon>
                            Zurück
                          </Button>
                          <Button
                            type="primary"
                            onClick={this.nextPage}
                            disabled={true}
                          >
                            Weiter
                            <Icon type="right"></Icon>
                          </Button>
                        </ButtonGroup>
                        <Button
                          type="primary"
                          icon="save"
                          htmlType="submit"
                          disabled={false}
                        >
                          Speichern
                        </Button>
                      </div>
                    ) : this.state.page === 0 ? (
                      <div>
                        <ButtonGroup style={{ marginRight: "8px" }}>
                          <Button
                            type="primary"
                            onClick={this.previousPage}
                            disabled={true}
                          >
                            <Icon type="left"></Icon>
                            Zurück
                          </Button>
                          <Button type="primary" onClick={this.nextPage}>
                            Weiter
                            <Icon type="right"></Icon>
                          </Button>
                        </ButtonGroup>
                        <Button
                          type="primary"
                          icon="save"
                          htmlType="submit"
                          disabled={true}
                        >
                          Speichern
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <ButtonGroup style={{ marginRight: "8px" }}>
                          <Button type="primary" onClick={this.previousPage}>
                            <Icon type="left"></Icon>
                            Zurück
                          </Button>
                          <Button type="primary" onClick={this.nextPage}>
                            Weiter
                            <Icon type="right"></Icon>
                          </Button>
                        </ButtonGroup>
                        <Button
                          type="primary"
                          icon="save"
                          htmlType="submit"
                          disabled={true}
                        >
                          Speichern
                        </Button>
                      </div>
                    )}
                  </AntForm.Item>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  }
}
