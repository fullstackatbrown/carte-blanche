import loadable from "@loadable/component";
import { Content } from "@prisma/client";
import { useState } from "react";
import { config } from "react-spring";
import CarouselItem from "./CarouselItem";
const Carousel = loadable(() => import("react-spring-3d-carousel"));

interface IFeaturedCarouselProps {
  data: Content[];
}

export default function FeaturedCarousel({ data }: IFeaturedCarouselProps) {
  const showNavigation = false;
  const offset = 2;
  const [goToSlide, setGoToSlide] = useState(0);

  const newSlides = data.map((content, index) => {
    return {
      key: content.id,
      content: (
        <CarouselItem
          key={content.id}
          content={content}
          onClick={() => setGoToSlide(index)}
        />
      ),
    };
  });
  return (
    <div className="m-auto h-96 w-5/6">
      <Carousel
        slides={newSlides}
        showNavigation={showNavigation}
        goToSlide={goToSlide}
        offsetRadius={offset}
        animationConfig={config.gentle}
      />
    </div>
  );
}
