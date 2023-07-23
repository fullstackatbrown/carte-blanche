import { FormControl, MenuItem, TextField } from "@mui/material";
import { ContentTypes } from "@types/IContent";
import { Controller, type FieldValues } from "react-hook-form";
import type { UploadFormInputProps } from "./UploadFormInputProps";

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
            {ContentTypes.map((role: string) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
}
