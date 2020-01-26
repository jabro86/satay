import { Field } from "formik";
import React from "react";

import { InputField } from "../../../shared/InputField";

export const Page1 = () => (
  <>
    <Field name="title" label="Name" component={InputField} />
    <Field
      name="description"
      label="Beschreibung"
      component={InputField}
      isTextArea
    />
    <Field name="pictureUrlExcercise" label="Bild" component={InputField} />
  </>
);
