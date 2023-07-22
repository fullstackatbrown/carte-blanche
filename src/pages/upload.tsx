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
import { resolve } from "path";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  contentType: z.enum(["TEXT", "IMAGE", "VIDEO", "AUDIO"]),
  caption: z.string().min(1, "Caption is required"),
  contentURL: z.string().min(1, "Content URL is required"),
  textContent: z.string().min(1, "Text Content is required"),
});

export interface IUpload {
  isOpen: boolean;
  onClose: () => void;
  runGetAllUsersQuery: () => void;
  setOpenSuccessSnackbar: (open: boolean) => void;
  setSuccessSnackbarMessage: (message: string) => void;
  setOpenErrorSnackbar: (open: boolean) => void;
  setErrorSnackbarMessage: (message: string) => void;
}

export default function Upload(props: IUpload) {
  // Deconstruct props
  const {
    isOpen,
    onClose,
    runGetAllUsersQuery,
    setOpenSuccessSnackbar,
    setSuccessSnackbarMessage,
    setOpenErrorSnackbar,
    setErrorSnackbarMessage,
  } = props;

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

  // Form methods
  const methods = useForm<IFormInput>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(createContentValidator),
  });
  const { handleSubmit, reset, control } = methods;
  const [formError, setFormError] = useState<boolean>(false);
  const [formErrorMessage, setFormErrorMessage] = useState<string>("");

  // Queries
  const runCreateUserQuery = async (contentToSave: IFormInput) => {
    try {
      // await api.post("/api/content", contentToSave);
      resolve();
    } catch (error) {
      setFormError(true);
      // setFormErrorMessage(error.message);
    }
  };

  const onSubmit = (data: IFormInput) => {
    // Edit
    const contentToSave = {
      title: data.title,
      contentType: data.contentType,
      caption: data.caption,
      contentURL: data.contentURL,
      textContent: data.textContent,
    };
    runCreateUserQuery(contentToSave);
    console.log("Saving", contentToSave);
  };

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
            <FormInputText
              name="title"
              control={control}
              label="Title"
              // styles={{ flex: 1 }}
            />
            <FormInputText
              name="caption"
              control={control}
              label="Caption"
              // styles={{ flex: 1 }}
            />
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
          <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
