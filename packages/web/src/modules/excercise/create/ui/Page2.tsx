import { Field } from "formik";
import React from "react";

import { InputField } from "../../../shared/InputField";
import { TagField } from "../../../shared/TagField";

export const Page2 = () => (
  <>
    <Field name="stepsExcercise" label="Ausführung" component={TagField} />
    <Field name="breathing" label="Atmung" component={InputField} isTextArea />
    <Field name="videoExcercise" label="Video" component={InputField} />
  </>
);
