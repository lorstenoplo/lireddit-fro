import { FieldError } from "../src/generated/graphql";

export const toErrorMap = (errors: FieldError[]) => {
  const errMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errMap[field] = message;
  });

  return errMap;
};
