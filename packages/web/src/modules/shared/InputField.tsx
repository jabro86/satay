import React from "react";
import { FieldProps } from "formik";
import { Form, Input } from "antd";

export const InputField: React.SFC<FieldProps<any> & {
  prefix: React.ReactNode;
  label?: string;
}> = ({ field, form: { touched, errors }, label, ...props }) => {
  const errorMsg = touched[field.name] && errors[field.name];
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };
  return (
    <Form.Item
      {...formItemLayout}
      label={label}
      help={errorMsg}
      validateStatus={(errorMsg && "error") || ""}
    >
      <Input {...field} {...props} />
    </Form.Item>
  );
};
