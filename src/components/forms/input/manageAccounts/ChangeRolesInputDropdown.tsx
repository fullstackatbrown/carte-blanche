import { FormControl, MenuItem, TextField } from "@mui/material";
import { Controller, type FieldValues } from "react-hook-form";
import type { UploadFormInputProps } from "../uploadForm/UploadFormInputProps";
import { Role } from "@prisma/client";

export function ChangeRolesInputDropdown<TFieldValues extends FieldValues>({
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
            label="New Role"
            placeholder="New Role"
            multiline
            variant="outlined"
            value={value}
            onChange={onChange}
          >
            <MenuItem value={Role.ADMIN}>Admin</MenuItem>
            <MenuItem value={Role.WRITER}>Writer</MenuItem>
            <MenuItem value={Role.READER}>Reader</MenuItem>
          </TextField>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
}
