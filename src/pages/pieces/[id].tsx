import { api } from "@CarteBlanche/utils/api";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import TextEditorView from "@CarteBlanche/components/TextEditorView";
import TopNav from "@CarteBlanche/components/TopNav";
import { ContentType } from "@prisma/client";
import PiecesSidebar from "@CarteBlanche/components/PiecesSidebar";
import { CircularProgress } from "@mui/material";

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

  // TODO: A bug here where pieceId can be undefined for a split second before it gets the id from the router
  // This is not breaking anything, but it causes an error in the console
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

  if (isLoading || isLoadingAuthor || !data || !author) {
    return (
      <div className="h-screen overflow-hidden">
        <TopNav />
        <div className="flex h-full">
          <PiecesSidebar backArrow />
          <div className="relative basis-3/4">
            <CircularProgress
              sx={{
                position: "absolute",
                top: "45%",
                left: "50%",
              }}
            />
          </div>
        </div>
      </div>
    );
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
      <div className="flex min-h-screen">
        <PiecesSidebar backArrow />
        <div className="mx-auto max-w-5xl basis-3/4 p-10">
          <div className="flex items-baseline justify-between">
            <h1 className="lowercase">
              <strong>{data.title}</strong> | {author.name}
            </h1>
            <p className="text-sm text-zinc-700">
              {formatDateTime(data.createdAt)}
            </p>
          </div>
          <div className="h-[50vh] w-full overflow-hidden">
            <img
              className="w-full"
              src={data.imgURL}
              alt={`Image content for ${data.title}`}
            />
            <p>Caption: {data.caption}</p>
          </div>
          {data.type === ContentType.TEXT && (
            <TextEditorView content={data.content ?? ""} />
          )}
        </div>
      </div>
    </>
  );
};

export default Piece;
