import { FieldProps } from "formik";
import * as React from "react";
import { Input } from "react-native-elements";

const errorStyle = {
  color: "red"
};

export class InputField extends React.Component<FieldProps> {
  onChangeText = (text: string) => {
    const {
      form: { setFieldValue },
      field: { name }
    } = this.props;
    setFieldValue(name, text);
  };

  render() {
    const {
      field,
      form: { touched, errors },
      ...props
    } = this.props;
    const errorMessage =
      touched[field.name] && errors[field.name]
        ? errors[field.name]
        : undefined;
    return (
      <Input
        {...props}
        onChangeText={this.onChangeText}
        value={field.value}
        errorMessage={
          typeof errorMessage === "object"
            ? errorMessage.toString()
            : errorMessage
        }
        errorStyle={errorStyle}
      />
    );
  }
}
