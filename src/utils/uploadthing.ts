import { generateComponents } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { CBFileRouter } from "@CarteBlanche/server/uploadthing";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<CBFileRouter>();

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<CBFileRouter>();
