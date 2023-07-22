import { Alert, Snackbar } from "@mui/material";

interface ISuccessSnackbarProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export function SuccessSnackbar(props: ISuccessSnackbarProps) {
  const { isOpen, onClose, message } = props;
  return (
    <Snackbar open={isOpen} autoHideDuration={5000} onClose={onClose}>
      <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
