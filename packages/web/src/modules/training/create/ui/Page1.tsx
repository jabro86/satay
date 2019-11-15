import { Field } from "formik";
import React from "react";

import { InputField } from "../../../shared/InputField";

export const Page1 = () => (
  <>
    <Field name="name" label="Name" component={InputField} />
    <Field name="description" label="Description" component={InputField} />
  </>
);
