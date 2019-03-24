import { changePasswordSchema } from "@faas/common";
import {
  NormalizedErrorMap,
  ForgotPasswordChangeMutationVariables
} from "@faas/controller";
import { Button, Form as AntForm, Icon } from "antd";
import { Field, Form, FormikProps, withFormik } from "formik";
import React from "react";

import { InputField } from "../../shared/InputField";

interface FormValues {
  newPassword: string;
}

interface Props {
  token: string;
  onFinish: () => void;
  submit: (
    values: ForgotPasswordChangeMutationVariables
  ) => Promise<NormalizedErrorMap | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    return (
      <Form style={{ display: "flex", marginTop: "100px" }}>
        <div style={{ width: "400", margin: "auto" }}>
          <Field
            name="newPassword"
            type="password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="New Password"
            component={InputField}
          />
          <AntForm.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Change Password
            </Button>
          </AntForm.Item>
        </div>
      </Form>
    );
  }
}

export const ChangePasswordView = withFormik<Props, FormValues>({
  validationSchema: changePasswordSchema,
  mapPropsToValues: () => ({ newPassword: "" }),
  handleSubmit: async ({ newPassword }, { props, setErrors }) => {
    const errors = await props.submit({ newPassword, key: props.token });
    if (errors) {
      setErrors(errors);
    } else {
      props.onFinish();
    }
  }
})(C);
