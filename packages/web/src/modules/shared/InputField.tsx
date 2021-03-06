import { Form, Input, InputNumber } from "antd";
import { FieldProps } from "formik";
import React from "react";

export const InputField: React.SFC<FieldProps<any> & {
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

  const Comp = userNumberComponent
    ? InputNumber
    : isTextArea
    ? Input.TextArea
    : Input;

  return (
    <Form.Item
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 12 }}
      label={label}
      help={errorMsg}
      validateStatus={(errorMsg && "error") || ""}
    >
      <Comp
        {...field}
        {...props}
        onChange={
          userNumberComponent
            ? (newValue: unknown) => {
                setFieldValue(field.name, newValue);
              }
            : onChange
        }
      />
    </Form.Item>
  );
};
