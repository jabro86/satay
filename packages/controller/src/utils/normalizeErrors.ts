import { NormalizedErrorMap } from "../types/NormalizedErrorMap";

interface Error {
  path: string;
  message: string;
}

export const normalizeErrors = (errors: Error[]): NormalizedErrorMap =>
  errors.reduce<NormalizedErrorMap>(
    (errorMap, { path, message }) => ({ ...errorMap, [path]: message }),
    {}
  );
