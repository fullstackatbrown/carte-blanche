import { api } from "@CarteBlanche/utils/api";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import CircularSpinner from "@CarteBlanche/components/CircularSpinner";
import TopNav from "@CarteBlanche/components/TopNav";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ContentType } from "@prisma/client";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import FontSize from "tiptap-extension-font-size";

/**
 * Handles formatting the date and time from a Date object
 * @param date Date object
 * @returns date and time in format "Month Day, Year at Hour:Minute [AM/PM]"
 */
const formatDateTime = (date: Date): string => {
  const formatDateOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  } as const;
  const formatTimeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  } as const;
  const stringDate = date.toLocaleString(undefined, formatDateOptions);
  const stringTime = date.toLocaleString(undefined, formatTimeOptions);
  return `${stringDate} at ${stringTime}`;
};

const Piece: NextPage = () => {
  const router = useRouter();
  const pieceId = router.query.id;

  const { data, isLoading, error } = api.content.getContentById.useQuery(
    { id: pieceId as string },
    { refetchOnWindowFocus: false }
  );

  const {
    data: author,
    isLoading: isLoadingAuthor,
    error: getAuthorError,
  } = api.user.getUser.useQuery(
    { id: data?.authorId },
    { refetchOnWindowFocus: false }
  );

  const editor = useEditor({
    editable: false,
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
    content: data?.content,
  });

  if (isLoading || isLoadingAuthor || !data || !author) {
    return <CircularSpinner />;
  }
  if (error) {
    return <p>Oh no... {error.message}</p>;
  }
  if (getAuthorError) {
    return <p>Oh no... {getAuthorError.message}</p>;
  }
  return (
    <>
      <TopNav />
      <div>
        <ArrowBackIcon
          onClick={() => {
            router.back();
          }}
          style={{
            height: "50px",
            width: "50px",
            cursor: "pointer",
          }}
        />
        <h1>
          <strong>{data.title}</strong> | {author.name}
        </h1>
      </div>
      <p>{formatDateTime(data.createdAt)}</p>
      <img src={data.imgURL} />
      <p>Caption: {data.caption}</p>
      {data.type === ContentType.TEXT && (
        <EditorContent
          editor={editor}
          className="flex w-full items-center justify-center"
        />
      )}
    </>
  );
};

export default Piece;
