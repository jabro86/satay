import React from "react";
import { FieldProps } from "formik";
import { Form, Input } from "antd";

export const InputField: React.SFC<
  FieldProps<any> & { prefix: React.ReactNode; label?: string }
> = ({ field, form: { touched, errors }, label, ...props }) => {
  const errorMsg = touched[field.name] && errors[field.name];
  return (
    <Form.Item
      label={label}
      help={errorMsg}
      validateStatus={(errorMsg && "error") || ""}
    >
      <Input {...field} {...props} />
    </Form.Item>
  );
};
