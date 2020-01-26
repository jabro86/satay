import { Form, Select } from "antd";
import { FieldProps } from "formik";
import React from "react";

export const TagField: React.SFC<FieldProps<any> & {
  prefix: React.ReactNode;
  label?: string;
  userNumberComponent?: boolean;
  isTextArea?: boolean;
}> = ({
  field: { onChange, ...field },
  form: { touched, errors, setFieldValue },
  label,
  userNumberComponent = false,
  isTextArea = false,
  prefix,
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];

  return (
    <Form.Item
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 12 }}
      label={label}
      help={errorMsg}
      validateStatus={(errorMsg && "error") || ""}
    >
      <Select
        {...field}
        {...props}
        mode="tags"
        style={{ width: "100%" }}
        onChange={(newValue: unknown) => {
          setFieldValue(field.name, newValue);
        }}
      />
    </Form.Item>
  );
};
