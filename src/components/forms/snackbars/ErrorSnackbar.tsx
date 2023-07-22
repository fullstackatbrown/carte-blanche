import { Alert, Snackbar } from "@mui/material";

interface IErrorSnackbarProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export function ErrorSnackbar(props: IErrorSnackbarProps) {
  const { isOpen, onClose, message } = props;
  return (
    <Snackbar open={isOpen} autoHideDuration={5000} onClose={onClose}>
      <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
