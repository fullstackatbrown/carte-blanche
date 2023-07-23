import { CBfileRouter } from "@CarteBlanche/server/uploadthing";
import { createNextPageApiHandler } from "uploadthing/next-legacy";

const handler = createNextPageApiHandler({
  router: CBfileRouter,
});

export default handler;
