import { api } from "@CarteBlanche/utils/api";
import type { Content } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

import { Delete, Star } from "@mui/icons-material";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Responsive, WidthProvider, type Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { ErrorSnackbar } from "../forms/snackbars/ErrorSnackbar";
import { SuccessSnackbar } from "../forms/snackbars/SuccessSnackbar";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface PiecesResponsiveGridReadProps {
  pieces: Content[];
  layout: Layouts | null;
  refetchPieces: Promise<UseQueryResult>;
}

/**
 * Toggle static property of all pieces in the layout
 * @param layout layout saved in the database
 * @returns the layout with all pieces set to static
 */
const toggleStatic = (layout: Layouts) => {
  const newLayout: Layouts = {};
  Object.keys(layout).forEach((key) => {
    newLayout[key] = layout[key]!.map((item) => {
      return {
        ...item,
        static: true,
      };
    });
  });
  return newLayout;
};

export default function PiecesResponsiveGridRead({
  pieces,
  layout,
  refetchPieces,
}: PiecesResponsiveGridReadProps) {
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [successSnackbarMessage, setSuccessSnackbarMessage] = useState("");
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState("");
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [deleteContentId, setDeleteContentId] = useState("");

  const { data: session } = useSession();

  const { mutate: toggleFeatured } =
    api.content.toggleFeaturedContent.useMutation({
      onError(error) {
        setOpenErrorSnackbar(true);
        setErrorSnackbarMessage(error.message);
        setDeleteContentId("");
      },
      onSuccess() {
        setOpenSuccessSnackbar(true);
        setSuccessSnackbarMessage(`Successfully toggled featured!`);
        setDeleteContentId("");
        refetchPieces();
      },
    });

  const { mutate: deleteContent } = api.content.deleteContent.useMutation({
    onError(error) {
      setOpenErrorSnackbar(true);
      setErrorSnackbarMessage(error.message);
      setDeleteContentId("");
      setOpenConfirmDeleteDialog(false);
    },
    onSuccess() {
      setOpenSuccessSnackbar(true);
      setSuccessSnackbarMessage("Successfully deleted content!");
      setDeleteContentId("");
      setOpenConfirmDeleteDialog(false);
      refetchPieces();
    },
  });

  const handleToggleFeatured = (id: string, featured: boolean) => {
    if (!session) {
      setOpenErrorSnackbar(true);
      setErrorSnackbarMessage("Error updating content! Not signed in.");
      return;
    }

    toggleFeatured({ id, isFeatured: !featured });
  };

  const handleDeleteContent = (id: string) => {
    if (!session) {
      setOpenErrorSnackbar(true);
      setErrorSnackbarMessage("Error deleting content! Not signed in.");
      return;
    }

    deleteContent({ id });
  };

  return (
    <>
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
      <Dialog
        open={openConfirmDeleteDialog}
        onClose={() => setOpenConfirmDeleteDialog(false)}
      >
        <DialogTitle id="alert-dialog-title">{"Delete Content?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this content? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenConfirmDeleteDialog(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteContent(deleteContentId)}
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ResponsiveGridLayout
        className="layout basis-full"
        rowHeight={300}
        width={1000}
        layouts={layout ? toggleStatic(layout) : {}}
        breakpoints={{ lg: 1200, md: 768, sm: 480, xs: 0 }}
        cols={{ lg: 6, md: 6, sm: 4, xs: 2 }}
      >
        {pieces.map((piece) => {
          return (
            <div
              key={piece.id}
              data-grid={{
                x: 0,
                y: 0,
                w: 3,
                h: 1,
                maxW: 3,
                maxH: 10,
                static: true,
              }}
              className="group relative transition duration-500 hover:scale-110"
            >
              <div className="absolute right-2 top-2 hidden gap-2 group-hover:flex">
                <button
                  className={clsx(
                    "rounded bg-black p-2",
                    piece.isFeatured ? "text-yellow-200" : "text-white"
                  )}
                  onClick={() =>
                    handleToggleFeatured(piece.id, piece.isFeatured)
                  }
                >
                  <Star />
                </button>
                <button
                  className="rounded bg-black p-2 text-white hover:text-red-200"
                  onClick={() => {
                    setDeleteContentId(piece.id);
                    setOpenConfirmDeleteDialog(true);
                  }}
                >
                  <Delete />
                </button>
              </div>

              <Link href={`/pieces/${piece.id}`} key={piece.id}>
                <img
                  src={piece.imgURL}
                  className="h-full w-full bg-gray-50 object-cover"
                />
              </Link>
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </>
  );
}
