import { Button, Form as AntForm, PageHeader, Breadcrumb } from "antd";
import { Form, Formik } from "formik";
import React, { PureComponent } from "react";
import { RouteComponentProps } from "react-router";

import { Page1 } from "./ui/Page1";
import { Page2 } from "./ui/Page2";
import { Link } from "react-router-dom";

interface FormValues {
  name: string;
  description: string;
}

const pages = [<Page1 />, <Page2 />];

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
              name: "",
              description: ""
            }}
            onSubmit={this.submit}
          >
            {() => (
              <Form style={{ display: "flex" }}>
                <div style={{ width: "400" }}>
                  {pages[this.state.page]}
                  <AntForm.Item>
                    {this.state.page === pages.length - 1 ? (
                      <div>
                        <Button type="primary" htmlType="submit">
                          Create Recipe
                        </Button>
                      </div>
                    ) : (
                      <Button type="primary" onClick={this.nextPage}>
                        Next Page
                      </Button>
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
