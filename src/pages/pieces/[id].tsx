import { api } from "@CarteBlanche/utils/api";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import CircularSpinner from "@CarteBlanche/components/CircularSpinner";
import TopNav from "@CarteBlanche/components/TopNav";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

  console.log(data);

  if (isLoading || !data) {
    return <CircularSpinner />;
  }
  if (error) {
    return <p>Oh no... {error.message}</p>;
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
          <strong>{data.title}</strong> | Author Name
        </h1>
      </div>
      <p>{formatDateTime(data.createdAt)}</p>
      <img src={data.contentURL} />
      <p>Caption: {data.caption}</p>
      {data.textContent}
    </>
  );
};

export default Piece;
