import { api } from "@CarteBlanche/utils/api";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import CircularSpinner from "@CarteBlanche/components/CircularSpinner";
import TextEditorView from "@CarteBlanche/components/TextEditorView";
import TopNav from "@CarteBlanche/components/TopNav";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ContentType } from "@prisma/client";

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
        <TextEditorView content={data.content ?? ""} />
      )}
    </>
  );
};

export default Piece;
