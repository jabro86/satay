import { Field } from "formik";
import React from "react";

import { InputField } from "../../../shared/InputField";

export const Page2 = () => (
  <>
    <Field name="ingredients" label="Ingredients" component={InputField} />
    <Field name="steps" label="Steps" component={InputField} />
  </>
);
