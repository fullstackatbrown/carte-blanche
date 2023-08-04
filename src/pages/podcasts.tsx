import { api } from "@CarteBlanche/utils/api";
import type { NextPage } from "next";

import PodcastItem from "@CarteBlanche/components/PodcastItem";
import TopNav from "@CarteBlanche/components/TopNav";
import { CircularProgress, Divider } from "@mui/material";

const Podcasts: NextPage = () => {
  const {
    data: podcasts,
    isLoading,
    error,
  } = api.content.getAllAudioContent.useQuery(
    {},
    { refetchOnWindowFocus: false }
  );

  if (isLoading || !podcasts) {
    return (
      <>
        <TopNav />
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        />
      </>
    );
  }
  if (error) {
    return <p>Oh no... {error.message}</p>;
  }
  return (
    <>
      <TopNav />
      <h1 className="text-center text-[min(20vw,10rem)] font-bold uppercase">
        Podcast
      </h1>

      <div className="mx-auto w-4/5">
        <h2 className="text-[min(7vw,3rem)]">Latest Episodes</h2>
        <Divider
          sx={{
            borderColor: "black",
            borderBottomWidth: "2px",
            margin: "2rem auto",
          }}
        />
        <div className="mx-auto grid grid-cols-1 place-items-center gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {podcasts.map((podcast) => (
            <PodcastItem key={podcast.id} podcast={podcast} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Podcasts;
