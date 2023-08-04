import { api } from "@CarteBlanche/utils/api";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";

import PiecesSidebar from "@CarteBlanche/components/PiecesSidebar";
import TopNav from "@CarteBlanche/components/TopNav";
import PiecesResponsiveGridRead from "@CarteBlanche/components/layouts/PiecesResponsiveGridRead";
import PiecesResponsiveGridWrite from "@CarteBlanche/components/layouts/PiecesResponsiveGridWrite";
import { Button, CircularProgress, Modal } from "@mui/material";

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

  const { data: user } = api.user.getUser.useQuery({
    id: session?.user.id,
  });

  const {
    data: layout,
    isLoading: isLoadingLayout,
    error: errorLayout,
    refetch: refetchLayout,
  } = api.layout.getLayout.useQuery(
    {
      name: "pieces",
    },
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
        void refetchLayout();
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

  if (isLoadingLayout) {
    return (
      <div className="h-screen overflow-hidden">
        <TopNav />
        <div className="flex h-full">
          <PiecesSidebar />
          <div className="relative basis-3/4">
            <CircularProgress
              sx={{
                position: "absolute",
                top: "45%",
                left: "50%",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (errorLayout) {
    return <p>Oh no... {errorLayout.message}</p>;
  }
  const piecesLayout = layout?.layout as unknown as Layouts;
  return (
    <>
      <TopNav />
      {isUpsertingLayout && (
        <Modal open={true}>
          <CircularProgress
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          />
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
          <PiecesResponsiveGridWrite />
        ) : (
          <PiecesResponsiveGridRead layout={piecesLayout} />
        )}
      </div>
    </>
  );
};

export default Pieces;
