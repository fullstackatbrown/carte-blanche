import TopNav from "@components/TopNav";
import UploadForm from "@components/forms/UploadForm";
import { ErrorSnackbar } from "@components/forms/snackbars/ErrorSnackbar";
import { SuccessSnackbar } from "@components/forms/snackbars/SuccessSnackbar";
import { NextPage } from "next";
import { useState } from "react";

const Upload: NextPage = () => {
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
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
        <p>We are glad that you want to upload content to our platform.</p>
        <p>Please fill out the form below to get started.</p>
        <UploadForm
          setOpenSuccessSnackbar={setOpenSuccessSnackbar}
          setSuccessSnackbarMessage={setSuccessSnackbarMessage}
          setOpenErrorSnackbar={setOpenErrorSnackbar}
          setErrorSnackbarMessage={setErrorSnackbarMessage}
        />
      </div>
    </>
  );
};

export default Upload;
