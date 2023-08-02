import { api } from "@CarteBlanche/utils/api";
import CircularSpinner from "../CircularSpinner";
import FeaturedCarousel from "../carousel/FeaturedCarousel";

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
    return <CircularSpinner />;
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
