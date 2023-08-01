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
      <h1 className="text-center text-2xl font-bold lowercase">Featured</h1>
      <FeaturedCarousel data={featuredContent} />
    </>
  );
}
