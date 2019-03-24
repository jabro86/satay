import { validUserSchema } from "@faas/common";
import { NormalizedErrorMap } from "@faas/controller";
import { Button, Form as AntForm, Icon } from "antd";
import { Field, Form, FormikProps, withFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";

import { InputField } from "../../shared/InputField";

interface FormValues {
  email: string;
  password: string;
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
          <Field
            name="password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
            component={InputField}
          />
          <AntForm.Item>
            <Link to="/forgot-password">Forgot password</Link>
          </AntForm.Item>
          <AntForm.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
          </AntForm.Item>
          <AntForm.Item>
            Or <Link to="/login">login now!</Link>
          </AntForm.Item>
        </div>
      </Form>
    );
  }
}

export const RegisterView = withFormik<Props, FormValues>({
  validationSchema: validUserSchema,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    } else {
      props.onFinish();
    }
  }
})(C);
