import { z } from "zod";
import { api } from "@CarteBlanche/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { ContentType } from "@prisma/client";
import { UploadFormInputDropdown } from "@CarteBlanche/components/forms/input/uploadForm/UploadFormInputDropdown";
import { FormInputText } from "@components/forms/input/FormInputText";
import { Box, Button, DialogActions } from "@mui/material";
import { FormErrorMessage } from "./FormErrorMessage";

// Interface for the form input
interface IFormInput {
  title: string;
  type: ContentType;
  caption: string;
  contentURL: string;
  textContent: string;
}

// Form validation schema using Zod
const createContentValidator = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.nativeEnum(ContentType),
  caption: z.string().min(1, "Caption is required"),
  contentURL: z.string().min(1, "Content URL is required"),
  textContent: z.string().min(1, "Text Content is required"),
});

/**
 * Default values for the form input
 */
const defaultFormValues = {
  title: "",
  type: ContentType.TEXT,
  caption: "",
  contentURL: "",
  textContent: "",
};

interface IUploadForm {
  setOpenSuccessSnackbar: (open: boolean) => void;
  setSuccessSnackbarMessage: (message: string) => void;
  setOpenErrorSnackbar: (open: boolean) => void;
  setErrorSnackbarMessage: (message: string) => void;
}

export default function UploadForm({
  setOpenSuccessSnackbar,
  setSuccessSnackbarMessage,
  setOpenErrorSnackbar,
  setErrorSnackbarMessage,
}: IUploadForm) {
  const [formErrorMessage, setFormErrorMessage] = useState("");

  // Form methods
  const { handleSubmit, reset, control } = useForm<IFormInput>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(createContentValidator),
  });

  const { mutate: createContent } = api.content.createContent.useMutation({
    onError(error) {
      setOpenErrorSnackbar(true);
      setErrorSnackbarMessage(error.message);
      setFormErrorMessage(error.message);
    },
    onSuccess(data) {
      setOpenSuccessSnackbar(true);
      setSuccessSnackbarMessage("Content successfully uploaded!");
      handleClose();
    },
  });

  const { data: session } = useSession();

  const onSubmit = (data: IFormInput) => {
    if (!session) {
      setOpenErrorSnackbar(true);
      setErrorSnackbarMessage("Error uploading content!");
      setFormErrorMessage("You must be logged in to upload content.");
      return;
    }

    const contentToSave = {
      authorId: session.user.id,
      title: data.title,
      type: data.type,
      caption: data.caption,
      contentURL: data.contentURL,
      textContent: data.textContent,
    };
    createContent(contentToSave);
  };

  /**
   * Function to handle closing the dialog and resetting the form
   */
  const handleClose = () => {
    setFormErrorMessage("");
    reset(defaultFormValues);
  };

  return (
    <>
      {formErrorMessage && (
        <FormErrorMessage errorMessage={`Error: ${formErrorMessage}`} />
      )}
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
          name="type"
          control={control}
          label="Content Type"
        />
        <FormInputText
          name="contentURL"
          control={control}
          label="Content URL"
        />

        <FormInputText
          name="textContent"
          control={control}
          label="Text Content"
        />
      </Box>
      <DialogActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          marginTop: "20px",
          padding: "0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <Button
            onClick={() => {
              reset(defaultFormValues);
            }}
            variant="outlined"
          >
            Reset
          </Button>
        </Box>
        <Button
          onClick={() => void handleSubmit(onSubmit)()}
          variant="outlined"
        >
          Submit
        </Button>
      </DialogActions>
    </>
  );
}
