import { UploadFormInputDropdown } from "@CarteBlanche/components/forms/input/uploadForm/UploadFormInputDropdown";
import { FormErrorMessage } from "@components/forms/FormErrorMessage";
import { FormInputText } from "@components/forms/input/FormInputText";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ContentType } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@CarteBlanche/utils/api";
import { useSession } from "next-auth/react";

// Interface for the form input
interface IFormInput {
  title: string;
  contentType: ContentType;
  caption: string;
  contentURL: string;
  textContent: string;
}

// Form validation schema using Zod
const createContentValidator = z.object({
  title: z.string().min(1, "Title is required"),
  contentType: z.nativeEnum(ContentType),
  caption: z.string().min(1, "Caption is required"),
  contentURL: z.string().min(1, "Content URL is required"),
  textContent: z.string().min(1, "Text Content is required"),
});

/**
 * Default values for the form input
 */
const defaultFormValues = {
  title: "",
  contentType: ContentType.TEXT,
  caption: "",
  contentURL: "",
  textContent: "",
};

export interface IUpload {
  isOpen: boolean;
  onClose: () => void;
  runGetAllUsersQuery: () => void;
  setOpenSuccessSnackbar: (open: boolean) => void;
  setSuccessSnackbarMessage: (message: string) => void;
  setOpenErrorSnackbar: (open: boolean) => void;
  setErrorSnackbarMessage: (message: string) => void;
}

export default function Upload({ onClose }: IUpload) {
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const formError = Boolean(formErrorMessage);

  const { mutate: createContent } = api.content.createContent.useMutation({
    onError(error) {
      setFormErrorMessage(error.message);
    },
    onSuccess() {
      handleClose();
    },
  });

  // Form methods
  const { handleSubmit, reset, control } = useForm<IFormInput>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(createContentValidator),
    mode: "onSubmit",
  });

  const { data: session } = useSession();

  const onSubmit = (data: IFormInput) => {
    console.log("called");
    if (!session) return;

    const contentToSave = {
      authorId: session.user.id,
      title: data.title,
      type: data.contentType,
      caption: data.caption,
      contentURL: data.contentURL,
      textContent: data.textContent,
    };
    console.log("calling api");
    createContent(contentToSave);
    console.log("Saving", contentToSave);
  };

  const submit = handleSubmit(onSubmit);

  /**
   * Function to handle closing the dialog and resetting the form
   */
  const handleClose = () => {
    setFormErrorMessage("");
    reset(defaultFormValues);
    onClose();
  };

  return (
    <>
      <Dialog fullWidth open={true} onClose={handleClose}>
        <DialogTitle>Upload Content</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the following information to upload content.
          </DialogContentText>
          {
            // If there is an error creating the user, display the error message
            formError && formErrorMessage && (
              <FormErrorMessage error={"Error: " + formErrorMessage} />
            )
          }
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <FormInputText name="title" control={control} label="Title" />
            <FormInputText name="caption" control={control} label="Caption" />
            <UploadFormInputDropdown
              name="contentType"
              control={control}
              label="Content Type"
            />
          </Box>
          <FormInputText
            name="textContent"
            control={control}
            label="Text Content"
            styles={{ marginTop: "20px" }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            padding: "0px 20px 15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>

            <Button
              onClick={() => {
                reset(defaultFormValues);
              }}
              variant="outlined"
            >
              Reset
            </Button>
          </Box>
          <Button onClick={() => void submit} variant="outlined">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
