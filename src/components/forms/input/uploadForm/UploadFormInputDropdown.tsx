import { FormControl, MenuItem, TextField } from "@mui/material";
import { Controller, type FieldValues } from "react-hook-form";
import type { UploadFormInputProps } from "./UploadFormInputProps";
import { ContentType } from "@prisma/client";

export function UploadFormInputDropdown<TFieldValues extends FieldValues>({
  name,
  control,
  styles,
}: UploadFormInputProps<TFieldValues>) {
  return (
    <FormControl style={styles} fullWidth>
      <Controller
        render={({ field: { onChange, value } }) => (
          <TextField
            id="outlined-textarea"
            select
            label="Content Type"
            placeholder="Content Type"
            multiline
            variant="outlined"
            value={value}
            onChange={onChange}
          >
            <MenuItem value={ContentType.AUDIO}>Audio</MenuItem>
            <MenuItem value={ContentType.IMAGE}>Image</MenuItem>
            <MenuItem value={ContentType.TEXT}>Text</MenuItem>
          </TextField>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
}
