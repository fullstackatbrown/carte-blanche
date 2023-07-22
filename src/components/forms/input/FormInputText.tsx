import { TextField } from "@mui/material";
import { Controller, type FieldValues } from "react-hook-form";
import type { FormInputProps } from "./FormInputProps";

export function FormInputText<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  styles,
}: FormInputProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          style={styles}
          fullWidth
          label={label}
          variant="outlined"
          multiline
        />
      )}
    />
  );
}
