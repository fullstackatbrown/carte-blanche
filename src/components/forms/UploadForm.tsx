import { api } from "@CarteBlanche/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { UploadFormInputDropdown } from "@CarteBlanche/components/forms/input/uploadForm/UploadFormInputDropdown";
import { useUploadThing } from "@CarteBlanche/utils/uploadthing";
import { FormInputText } from "@components/forms/input/FormInputText";
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  Modal,
} from "@mui/material";
import { ContentType } from "@prisma/client";
import { FormErrorMessage } from "./FormErrorMessage";
import TextEditor from "./TextEditor";

import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import FontSize from "tiptap-extension-font-size";

// Interface for the form input
interface IFormInput {
  title: string;
  type: ContentType;
  caption: string;
  imgURL: File | string;
  content: string;
}

// Zod validation schemas for the form input
const createContentValidator = z.object({
  title: z.string().min(1, "Title is required"),
  caption: z.string().min(1, "Caption is required"),
  imgURL: z.custom<File>().or(z.string().url("Not a valid URL")),
});

const createImageContentValidator = createContentValidator.extend({
  type: z.literal(ContentType.IMAGE),
});

const createTextContentValidator = createContentValidator.extend({
  type: z.literal(ContentType.TEXT),
});

const createAudioContentValidator = createContentValidator.extend({
  type: z.literal(ContentType.AUDIO),
  content: z.string().url("Not a valid URL"),
});

/**
 * Default values for the form input
 */
const defaultFormValues = {
  title: "",
  type: ContentType.TEXT,
  caption: "",
  imgURL: "",
  content: "",
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
  // States
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Rich text editor
  const editor = useEditor({
    extensions: [
      Underline,
      StarterKit,
      FontSize,
      TextStyle,
      Color,
      Image,
      Link.configure({
        HTMLAttributes: { class: "text-blue-500" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: true }),
    ],
    editorProps: {
      attributes: {
        class:
          "border-4 p-12 prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none marker:text-black w-full",
      },
    },
    content: `Write your article here...`,
  });

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
    resolver: zodResolver(
      createTextContentValidator
        .or(createAudioContentValidator)
        .or(createImageContentValidator)
    ),
  });
  const { mutate: createContent, isLoading: uploadingContent } =
    api.content.createContent.useMutation({
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

  const isTextContent = watch("type") === ContentType.TEXT;
  const isAudioContent = watch("type") === ContentType.AUDIO;

  const onSubmit = async (data: IFormInput) => {
    if (!session) {
      setOpenErrorSnackbar(true);
      setErrorSnackbarMessage("Error uploading content!");
      setFormErrorMessage("You must be logged in to upload content.");
      return;
    }

    // Validate text content
    if (isTextContent) {
      if (!editor) {
        setOpenErrorSnackbar(true);
        setErrorSnackbarMessage("Error uploading content!");
        setFormErrorMessage("No text content entered!");
        return;
      }
      if (
        editor.getHTML() === "<p></p>" ||
        editor.getHTML() === "<p>Write your article here...</p>"
      ) {
        setOpenErrorSnackbar(true);
        setErrorSnackbarMessage("Error uploading content!");
        setFormErrorMessage("No text content entered!");
        return;
      }
    }

    // Validate image content
    // Enforce that the user has selected an image
    if (data.imgURL === "") {
      setOpenErrorSnackbar(true);
      setErrorSnackbarMessage("Error uploading content!");
      setFormErrorMessage("No image selected!");
      return;
    }

    let imgURL = "";
    setUploadingImage(true);
    if (typeof data.imgURL !== "string") {
      const uploadedFile = await startUpload([data.imgURL]);
      if (!uploadedFile?.[0]) {
        setOpenErrorSnackbar(true);
        setErrorSnackbarMessage("Error uploading content!");
        setFormErrorMessage("No image selected!");
        setUploadingImage(false);
        return;
      }
      imgURL = uploadedFile[0].fileUrl;
    } else {
      imgURL = data.imgURL;
    }
    setUploadingImage(false);

    const contentToSave = {
      authorId: session.user.id,
      title: data.title,
      type: data.type,
      caption: data.caption,
      imgURL: imgURL,
      content: isTextContent ? editor?.getHTML() : data.content,
    };

    createContent(contentToSave);
  };

  const handleReset = () => {
    setFormErrorMessage("");
    reset(defaultFormValues);
  };

  return (
    <>
      {(uploadingContent || uploadingImage) && (
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
        <Controller
          control={control}
          name="imgURL"
          rules={{ required: true }}
          render={({ field: { value, onChange, ...props } }) => {
            return (
              <input
                className="w-full"
                {...props}
                onChange={(e) => {
                  onChange(e.target.files?.[0]);
                }}
                type="file"
                accept=".png,.jpg,.jpeg,.heic,.webp"
              />
            );
          }}
        />
        {isAudioContent && (
          <FormInputText name="content" control={control} label="Spotify URL" />
        )}
        {isTextContent && <TextEditor editor={editor} />}
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
          style={{ backgroundColor: "#3576cb", color: "white" }}
        >
          Submit
        </Button>
      </DialogActions>
    </>
  );
}
