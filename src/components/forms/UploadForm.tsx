import { api } from "@CarteBlanche/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import RichTextEditor from "@CarteBlanche/components/RichTextEditor";
import { UploadFormInputDropdown } from "@CarteBlanche/components/forms/input/uploadForm/UploadFormInputDropdown";
import { useUploadThing } from "@CarteBlanche/utils/uploadthing";
import { FormInputText } from "@components/forms/input/FormInputText";
import { Box, Button, DialogActions } from "@mui/material";
import { ContentType } from "@prisma/client";
import type { Editor as TinyMCEEditor } from "tinymce";
import { FormErrorMessage } from "./FormErrorMessage";

// Interface for the form input
interface IFormInput {
  title: string;
  type: ContentType;
  caption: string;
  contentURL: File | string;
}

// Form validation schema using Zod
const createContentValidator = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.nativeEnum(ContentType),
  caption: z.string().min(1, "Caption is required"),
  contentURL: z.custom<File>().or(z.string().url("Not a valid URL")),
});

/**
 * Default values for the form input
 */
const defaultFormValues = {
  title: "",
  type: ContentType.TEXT,
  caption: "",
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
  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      console.log(res);
    },
    onUploadError: (error) => {
      console.log(error);
    },
  });
  const { handleSubmit, reset, control, watch } = useForm<IFormInput>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(createContentValidator),
  });
  const { mutate: createContent } = api.content.createContent.useMutation({
    onError(error) {
      setOpenErrorSnackbar(true);
      setErrorSnackbarMessage(error.message);
      setFormErrorMessage(error.message);
    },
    onSuccess() {
      setOpenSuccessSnackbar(true);
      setSuccessSnackbarMessage("Content successfully uploaded!");
      handleReset();
    },
  });
  const { data: session } = useSession();
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const isTextContent = watch("type") === ContentType.TEXT;
  const isAudioContent = watch("type") === ContentType.AUDIO;

  const onSubmit = async (data: IFormInput) => {
    if (!session) {
      setOpenErrorSnackbar(true);
      setErrorSnackbarMessage("Error uploading content!");
      setFormErrorMessage("You must be logged in to upload content.");
      return;
    }

    let contentURL = "";
    if (typeof data.contentURL !== "string") {
      const uploadedFile = await startUpload([data.contentURL]);
      if (!uploadedFile?.[0]) {
        setOpenErrorSnackbar(true);
        setErrorSnackbarMessage("Error uploading content!");
        setFormErrorMessage("No image selected!");
        return;
      }
      contentURL = uploadedFile[0].fileUrl;
    } else {
      contentURL = data.contentURL;
    }

    const contentToSave = {
      authorId: session.user.id,
      title: data.title,
      type: data.type,
      caption: data.caption,
      contentURL: contentURL,
      textContent: editorRef.current!.getContent() ?? "",
    };

    createContent(contentToSave);
  };

  const handleReset = () => {
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
        {isAudioContent ? (
          <FormInputText
            name="contentURL"
            control={control}
            label="Spotify URL"
          />
        ) : (
          <Controller
            control={control}
            name="contentURL"
            rules={{ required: true }}
            render={({ field: { value, onChange, ...props } }) => {
              return (
                <input
                  {...props}
                  onChange={(e) => {
                    onChange(e.target.files?.[0]);
                  }}
                  type="file"
                  accept=".png,.jpg,.jpeg,.heic,.webp"
                />
              );
            }}
          ></Controller>
        )}
        {isTextContent && <RichTextEditor editorRef={editorRef} />}
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
              handleReset();
            }}
            variant="outlined"
          >
            Reset
          </Button>
        </Box>
        <Button
          onClick={() => void handleSubmit(onSubmit)()}
          variant="contained"
          style={{ backgroundColor: "#2196f3", color: "white" }}
        >
          Submit
        </Button>
      </DialogActions>
    </>
  );
}
