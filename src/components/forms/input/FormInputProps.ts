import type { ControllerProps, FieldValues } from "react-hook-form";

export type FormInputProps<TFieldValues extends FieldValues> = Pick<
  ControllerProps<TFieldValues>,
  "control" | "name"
> & {
  label: string;
  styles?: any;
};
