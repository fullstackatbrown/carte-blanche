import { Typography } from "@mui/material";
import { FieldError } from "react-hook-form";

interface IFormErrorMessage {
  error: string | Error | FieldError | null | undefined;
}

export const FormErrorMessage = ({ error }: IFormErrorMessage) => {
  if (error == null) {
    return null;
  }

  let message = "";

  if (isFieldError(error)) {
    message = error.message ?? "";
  }

  if (isErrorObject(error)) {
    message = error.message;
  }

  if (typeof error === "string") {
    message = error;
  }

  return (
    <Typography
      variant="subtitle1"
      color="red"
      role="alert"
      className="formErrorMessage"
    >
      {message}
    </Typography>
  );
};

function isFieldError(error: IFormErrorMessage["error"]): error is FieldError {
  return (error as FieldError).type != null;
}

function isErrorObject(error: IFormErrorMessage["error"]): error is Error {
  return (error as Error).message != null;
}
