import { withCreateExcercise, WithCreateExcercise } from "@satay/controller";
import { Breadcrumb, Button, Form as AntForm, Icon, PageHeader } from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import { Form, Formik, FormikActions } from "formik";
import React, { PureComponent } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Page1 } from "./ui/Page1";
import { Page2 } from "./ui/Page2";
import { Page3 } from "./ui/Page3";
import { FileWithPath } from "react-dropzone";

interface FormValues {
  title: string;
  description: string;
  pictureExcercise: FileWithPath | null;
  videoExcercise: string;
  stepsExcercise: string[];
  breathing: string;
  pictureMuscles: FileWithPath | null;
  listInvolvedMuscles: string[];
}

const pages = [<Page1 />, <Page2 />, <Page3 />];

interface State {
  page: number;
}

class C extends PureComponent<
  RouteComponentProps<{}> & WithCreateExcercise,
  State
> {
  state: State = {
    page: 0
  };

  submit = async (
    values: FormValues,
    { setSubmitting }: FormikActions<FormValues>
  ) => {
    await this.props.createExcercise(values);
    setSubmitting(false);
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
              pictureExcercise: null,
              pictureMuscles: null,
              stepsExcercise: [],
              videoExcercise: ""
            }}
            onSubmit={this.submit}
          >
            {({ isSubmitting, isValid, values }) =>
              // @ts-ignore
              console.log(values) || (
                <Form style={{ display: "flex" }}>
                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        overflow: "auto ",
                        minHeight: "300px",
                        maxHeight: "300px"
                      }}
                    >
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
                            disabled={!isValid || isSubmitting}
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
              )
            }
          </Formik>
        </div>
      </>
    );
  }
}

export const CreateExcerciseConnector = withCreateExcercise(C);
