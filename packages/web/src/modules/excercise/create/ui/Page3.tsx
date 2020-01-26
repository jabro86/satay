import { Field } from "formik";
import React from "react";

import { InputField } from "../../../shared/InputField";
import { TagField } from "../../../shared/TagField";

export const Page3 = () => (
  <>
    <Field
      name="pictureUrlMuscles"
      label="Bild Muskeln"
      component={InputField}
    />
    <Field
      name="listInvolvedMuscles"
      label="Beteiligte Muskeln"
      component={TagField}
    />
  </>
);
