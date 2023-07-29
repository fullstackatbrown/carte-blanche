import { api } from "@CarteBlanche/utils/api";
import { NextPage } from "next";

import CircularSpinner from "@CarteBlanche/components/CircularSpinner";
import PodcastItem from "@CarteBlanche/components/PodcastItem";
import TopNav from "@CarteBlanche/components/TopNav";
import { ContentType } from "@prisma/client";

const MockPodcasts = [
  {
    id: "1",
    title: "Awesome Podcast 1",
    type: ContentType.AUDIO,
    caption: "Andrew!",
    contentURL:
      "https://open.spotify.com/show/0b5qzMiw22wHBfe1x9LfaQ?si=7294060bce5f4b6c",
    textContent: "Test",
    authorId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title:
      "Super long title to see how the text wrapping is being handled. Let's see if this works!",
    type: ContentType.AUDIO,
    caption: "Andrew!",
    contentURL:
      "https://open.spotify.com/show/0b5qzMiw22wHBfe1x9LfaQ?si=7294060bce5f4b6c",
    textContent: "Test",
    authorId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Awesome Podcast 3",
    type: ContentType.AUDIO,
    caption: "Andrew!",
    contentURL:
      "https://open.spotify.com/show/0b5qzMiw22wHBfe1x9LfaQ?si=7294060bce5f4b6c",
    textContent: "Test",
    authorId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

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
        {MockPodcasts.map((podcast) => (
          <PodcastItem key={podcast.id} podcast={podcast} />
        ))}
      </div>
      {/* TODO: Resort to this once we have the backend working */}
      {/* {podcasts.map((podcast) => (
        <PodcastItem key={podcast.id} podcast={podcast} />
      ))} */}
    </>
  );
};

export default Podcasts;
