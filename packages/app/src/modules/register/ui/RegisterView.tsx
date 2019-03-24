import { validUserSchema } from "@faas/common";
import { NormalizedErrorMap } from "@faas/controller";
import { Field, FormikProps, withFormik } from "formik";
import * as React from "react";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-elements";

import { InputField } from "../../shared/InputField";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <View style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Card>
          <Text style={{ fontSize: 30, marginBottom: 10 }}>Register</Text>
          <Field
            name="email"
            placeholder="E-Mail"
            component={InputField}
            containerStyle={{ width: "100%" }}
          />
          <Field
            name="password"
            secureTextEntry={true}
            placeholder="Password"
            component={InputField}
            containerStyle={{ width: "100%" }}
          />
          <Button
            buttonStyle={{ marginTop: 30 }}
            title="Submit"
            onPress={handleSubmit}
          />
        </Card>
      </View>
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
    }
  }
})(C);
