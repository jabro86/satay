import { Field } from "formik";
import React from "react";

import { InputField } from "../../../shared/InputField";

export const Page2 = () => (
  <>
    <Field name="excercises" label="Excercises" component={InputField} />
  </>
);
