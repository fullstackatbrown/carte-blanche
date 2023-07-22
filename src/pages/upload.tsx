import TopNav from "@components/TopNav";
import UploadForm from "@components/forms/UploadForm";
import { ErrorSnackbar } from "@components/forms/snackbars/ErrorSnackbar";
import { SuccessSnackbar } from "@components/forms/snackbars/SuccessSnackbar";
import { useState } from "react";

export default function Upload() {
  // State for the snackbar
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false); // [1
  const [successSnackbarMessage, setSuccessSnackbarMessage] = useState("");
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState("");

  return (
    <>
      <TopNav />
      <SuccessSnackbar
        isOpen={openSuccessSnackbar}
        onClose={() => setOpenSuccessSnackbar(false)}
        message={successSnackbarMessage}
      />
      <ErrorSnackbar
        isOpen={openErrorSnackbar}
        onClose={() => setOpenErrorSnackbar(false)}
        message={errorSnackbarMessage}
      />
      <div className="m-10">
        <h1>Upload Content</h1>
        <p>Please fill out the following information to upload content.</p>
        <UploadForm
          setOpenSuccessSnackbar={setOpenSuccessSnackbar}
          setSuccessSnackbarMessage={setSuccessSnackbarMessage}
          setOpenErrorSnackbar={setOpenErrorSnackbar}
          setErrorSnackbarMessage={setErrorSnackbarMessage}
        />
      </div>
    </>
  );
}
