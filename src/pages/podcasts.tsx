import { api } from "@CarteBlanche/utils/api";
import type { NextPage } from "next";

import CircularSpinner from "@CarteBlanche/components/CircularSpinner";
import PodcastItem from "@CarteBlanche/components/PodcastItem";
import TopNav from "@CarteBlanche/components/TopNav";

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
    return <CircularSpinner />;
  }
  if (error) {
    return <p>Oh no... {error.message}</p>;
  }
  return (
    <>
      <TopNav />
      <h1>Podcasts!</h1>

      <h1>Latest Episodes</h1>
      <div className="flex flex-row flex-wrap justify-center">
        {podcasts.map((podcast) => (
          <PodcastItem key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </>
  );
};

export default Podcasts;
