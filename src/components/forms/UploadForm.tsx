import { api } from "@CarteBlanche/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { type ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { UploadFormInputDropdown } from "@CarteBlanche/components/forms/input/uploadForm/UploadFormInputDropdown";
import RichTextEditor from "@CarteBlanche/components/RichTextEditor";
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
  contentURL: string;
}

// Form validation schema using Zod
const createContentValidator = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.nativeEnum(ContentType),
  caption: z.string().min(1, "Caption is required"),
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

  // Form methods
  const { register, handleSubmit, reset, control, watch } = useForm<IFormInput>(
    {
      defaultValues: defaultFormValues,
      resolver: zodResolver(createContentValidator),
    }
  );

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
      contentURL: uploadedImageLink,
      textContent: editorRef.current!.getContent() ?? "",
    };
    console.log(contentToSave);
    createContent(contentToSave);
  };

  /**
   * Function to handle resetting the form
   */
  const handleReset = () => {
    setFormErrorMessage("");
    setSelectedImage(null);
    reset(defaultFormValues);
  };

  const isTextContent = watch("type") === ContentType.TEXT;
  const isAudioContent = watch("type") === ContentType.AUDIO;

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadedImageLink, setUploadedImageLink] = useState(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedImage(file ?? null);
  };

  const handleUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      try {
        const headers = {
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
        };
        const imgurResponse = await axios.post(
          "https://api.imgur.com/3/image",
          formData,
          { headers }
        );
        // TODO: Use Zod to validate the imgur response to ensure type safety
        setUploadedImageLink(imgurResponse.data.data.link);
      } catch (error) {
        setFormErrorMessage(
          error.message + ". " + error.response.data.data.error
        );
        setOpenErrorSnackbar(true);
        setErrorSnackbarMessage("Error uploading image!");
        console.error("Error uploading image:", error);
        setUploadedImageLink(null);
      }
    }
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
          <div className="w-full">
            {/* <input type="file" onChange={handleImageChange} /> */}
            <input
              {...register("contentURL")}
              onChange={handleImageChange}
              type="file"
              name="contentURL"
            />
            <button onClick={() => void handleUpload()}>Upload</button>
          </div>
        )}
        {isTextContent && (
          // Key should be something that is called whenever "reset" button is clicked
          <RichTextEditor editorRef={editorRef} />
        )}
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
