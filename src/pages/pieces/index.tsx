import { api } from "@CarteBlanche/utils/api";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";

import CircularSpinner from "@CarteBlanche/components/CircularSpinner";
import PiecesSidebar from "@CarteBlanche/components/PiecesSidebar";
import TopNav from "@CarteBlanche/components/TopNav";
import PiecesResponsiveGridRead from "@CarteBlanche/components/layouts/PiecesResponsiveGridRead";
import PiecesResponsiveGridWrite from "@CarteBlanche/components/layouts/PiecesResponsiveGridWrite";
import { Button, Modal } from "@mui/material";

import { ErrorSnackbar } from "@CarteBlanche/components/forms/snackbars/ErrorSnackbar";
import { SuccessSnackbar } from "@CarteBlanche/components/forms/snackbars/SuccessSnackbar";
import type { Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { FormErrorMessage } from "@CarteBlanche/components/forms/FormErrorMessage";

const Pieces: NextPage = () => {
  // States
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [successSnackbarMessage, setSuccessSnackbarMessage] = useState("");
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // API Calls
  const { data: session } = useSession();

  const { data: user } = api.user.getUser.useQuery(
    { id: session?.user.id },
    { refetchOnWindowFocus: false }
  );

  const { mutate: upsertLayout, isLoading: isUpsertingLayout } =
    api.layout.upsertLayout.useMutation({
      onError(error) {
        setOpenErrorSnackbar(true);
        setErrorSnackbarMessage(error.message);
        setErrorMessage(error.message);
      },
      onSuccess() {
        setOpenSuccessSnackbar(true);
        setSuccessSnackbarMessage("Layout successfully saved!");
        setIsEditing(false);
        setErrorMessage("");
      },
    });

  /**
   * Handles saving of the grid layout
   */
  const saveGridLayout = () => {
    const layout = localStorage.getItem("layout");
    if (!layout) {
      setErrorMessage("Local storage for grid layout is empty!");
      setOpenErrorSnackbar(true);
      setErrorSnackbarMessage("Error saving layout!");
      return;
    }
    const layoutToSave = {
      name: "pieces",
      layout: JSON.parse(layout) as Layouts,
    };

    upsertLayout(layoutToSave);
  };

  const {
    data: pieces,
    isLoading,
    error,
  } = api.content.getAllTextAndImageContent.useQuery(
    {},
    { refetchOnWindowFocus: false }
  );

  const {
    data: layout,
    isLoading: isLoadingLayout,
    error: errorLayout,
  } = api.layout.getLayout.useQuery(
    { name: "pieces" },
    { refetchOnWindowFocus: false }
  );

  if (isLoading || isLoadingLayout || !pieces) {
    return <CircularSpinner />;
  }
  if (error) {
    return <p>Oh no... {error.message}</p>;
  }
  if (errorLayout) {
    return <p>Oh no... {errorLayout.message}</p>;
  }
  const piecesLayout = layout?.layout
    ? (layout.layout as unknown as Layouts)
    : null;
  return (
    <>
      <TopNav />
      {isUpsertingLayout && (
        <Modal open={true}>
          <CircularSpinner />
        </Modal>
      )}
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
      {isEditing && (
        <div className="bg-cyan-300">
          <h1>EDITING MODE</h1>
          {errorMessage && (
            <FormErrorMessage errorMessage={`Error: ${errorMessage}`} />
          )}
          <Button onClick={() => setIsEditing(!isEditing)}>Cancel</Button>
          <Button onClick={saveGridLayout}>Save</Button>
        </div>
      )}
      <div className="flex min-h-screen">
        <PiecesSidebar user={user ?? undefined} setIsEditing={setIsEditing} />
        {isEditing ? (
          <PiecesResponsiveGridWrite pieces={pieces} />
        ) : (
          <PiecesResponsiveGridRead pieces={pieces} layout={piecesLayout} />
        )}
      </div>
    </>
  );
};

export default Pieces;
