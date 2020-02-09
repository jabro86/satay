import { Field } from "formik";
import React from "react";

import { InputField } from "../../../shared/InputField";
import { DropzoneField } from "../../../shared/DropzoneField";

export const Page1 = () => (
  <>
    <Field name="title" label="Name" component={InputField} />
    <Field
      name="description"
      label="Beschreibung"
      component={InputField}
      isTextArea
    />
    <Field name="pictureExcercise" label="Bild" component={DropzoneField} />
  </>
);
