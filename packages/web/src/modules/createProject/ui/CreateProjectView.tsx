import { CreateProjectProps, withCreateProject } from "@faas/controller";
import { Button, Form as AntForm } from "antd";
import { Field, Form, Formik, FormikActions } from "formik";
import React from "react";

import { InputField } from "../../shared/InputField";

interface FormValues {
  title: string;
  description: string;
}

interface Props {
  onProjectCreated: (id: string) => void;
}

class C extends React.Component<Props & CreateProjectProps> {
  submit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikActions<FormValues>
  ) => {
    const newProjectId = await this.props.createProject(values);
    setSubmitting(false);
    resetForm();
    if (newProjectId) {
      this.props.onProjectCreated(newProjectId);
    }
  };
  render() {
    return (
      <Formik<FormValues>
        initialValues={{ title: "", description: "" }}
        onSubmit={this.submit}
      >
        {({ isSubmitting }) => (
          <Form style={{ width: 400, marginLeft: "20px" }}>
            <Field
              label="Title"
              name="title"
              placeholder="Title"
              component={InputField}
            />
            <Field
              name="description"
              label="Description"
              placeholder="Description"
              component={InputField}
            />
            <AntForm.Item>
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                Create Project
              </Button>
            </AntForm.Item>
          </Form>
        )}
      </Formik>
    );
  }
}

export const CreateProjectView: React.ComponentClass<Props> = withCreateProject(
  C
);
