import { api } from "@CarteBlanche/utils/api";
import FeaturedCarousel from "../carousel/FeaturedCarousel";
import { CircularProgress } from "@mui/material";

export default function FeaturedContent() {
  const {
    data: featuredContent,
    isLoading,
    error,
  } = api.content.getAllFeaturedContent.useQuery(
    {},
    { refetchOnWindowFocus: false }
  );

  if (isLoading || !featuredContent) {
    return (
      <CircularProgress
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      />
    );
  }

  if (error) {
    return <p>Oh no... {error.message}</p>;
  }

  return (
    <>
      <p className="relative left-[3%] top-[-35%] hidden w-0 text-6xl font-normal lowercase text-white lg:block xl:left-[7%]">
        Featured:
      </p>
      <FeaturedCarousel data={featuredContent} />
    </>
  );
}
