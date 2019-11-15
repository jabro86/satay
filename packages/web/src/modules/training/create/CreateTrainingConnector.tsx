import { Button, Form as AntForm } from "antd";
import { Form, Formik } from "formik";
import React, { PureComponent } from "react";
import { RouteComponentProps } from "react-router";

import { Page1 } from "./ui/Page1";
import { Page2 } from "./ui/Page2";

interface FormValues {
  name: string;
  description: string;
}

const pages = [<Page1 />, <Page2 />];

interface State {
  page: number;
}

export class CreateTrainingConnector extends PureComponent<
  RouteComponentProps<{}>,
  State
> {
  state: State = {
    page: 0
  };

  submit = (values: any) => {
    console.log("TCL: submit -> values", values);
  };

  nextPage = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  render() {
    return (
      <Formik<FormValues>
        initialValues={{
          name: "",
          description: ""
        }}
        onSubmit={this.submit}
      >
        {() => (
          <Form style={{ display: "flex", marginTop: "100px" }}>
            <div style={{ width: "400", margin: "auto" }}>
              {pages[this.state.page]}
              <AntForm.Item>
                {this.state.page === pages.length - 1 ? (
                  <Button type="primary" htmlType="submit">
                    Create Recipe
                  </Button>
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
    );
  }
}
