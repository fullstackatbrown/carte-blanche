import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const CBfileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    ({ metadata, file }) => {
      console.log("file uploaded", metadata, file);
    }
  ),
} satisfies FileRouter;

export type CBFileRouter = typeof CBfileRouter;
