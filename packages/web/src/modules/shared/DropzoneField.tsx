import { FieldProps } from "formik";
import React from "react";
import Dropzone from "react-dropzone";

export const DropzoneField: React.SFC<FieldProps<any>> = ({
  field: { name },
  form: { setFieldValue },
  ...props
}) => {
  return (
    <Dropzone
      accept="image/*"
      multiple={false}
      onDrop={([file]) => {
        setFieldValue(name, file);
      }}
    >
      <p>Lade dein Foto hier hoch!</p>
    </Dropzone>
  );
};
