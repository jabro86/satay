import { NormalizedErrorMap } from "@faas/controller";
import { Button, Form as AntForm, Icon } from "antd";
import { Field, Form, FormikProps, withFormik } from "formik";
import React from "react";

import { InputField } from "../../shared/InputField";

interface FormValues {
  email: string;
}

interface Props {
  onFinish: () => void;
  submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    return (
      <Form style={{ display: "flex", marginTop: "100px" }}>
        <div style={{ width: "400", margin: "auto" }}>
          <Field
            name="email"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="E-Mail"
            component={InputField}
          />
          <AntForm.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Reset Password
            </Button>
          </AntForm.Item>
        </div>
      </Form>
    );
  }
}

export const ForgotPasswordView = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({ email: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    } else {
      props.onFinish();
    }
  }
})(C);
