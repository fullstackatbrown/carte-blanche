import type { NextPage } from "next";
import { useState } from "react";

import ManageAccountsForm from "@CarteBlanche/components/forms/ManageAccountsForm";
import TopNav from "@components/TopNav";
import { ErrorSnackbar } from "@components/forms/snackbars/ErrorSnackbar";
import { SuccessSnackbar } from "@components/forms/snackbars/SuccessSnackbar";

const Accounts: NextPage = () => {
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
        <h1>Manage Accounts</h1>
        <p>Use this page to manage the settings of other accounts.</p>
        <ManageAccountsForm
          setOpenSuccessSnackbar={setOpenSuccessSnackbar}
          setSuccessSnackbarMessage={setSuccessSnackbarMessage}
          setOpenErrorSnackbar={setOpenErrorSnackbar}
          setErrorSnackbarMessage={setErrorSnackbarMessage}
        />
      </div>
    </>
  );
};

export default Accounts;
