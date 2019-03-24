import * as yup from "yup";
export const resourceNameNotLongEnough = "Name must be at least 2 characters";
export const validResourceSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(2, resourceNameNotLongEnough)
    .max(255)
});
