import loadable from "@loadable/component";
import type { Content } from "@prisma/client";
import { useState } from "react";
import { config } from "react-spring";
import CarouselItem from "./CarouselItem";
// eslint-disable-next-line
// @ts-ignore
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
    <div className="m-auto flex h-[85%] w-[90vw] items-center">
      <Carousel
        // eslint-disable-next-line
        // @ts-ignore
        slides={newSlides}
        showNavigation={showNavigation}
        goToSlide={goToSlide}
        offsetRadius={offset}
        animationConfig={config.gentle}
      />
    </div>
  );
}
