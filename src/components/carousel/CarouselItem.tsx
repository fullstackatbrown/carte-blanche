import type { Content } from "@prisma/client";
import Link from "next/link";

interface ICarouselItemProps {
  content: Content;
  onClick: () => void;
}

export default function CarouselItem({ content, onClick }: ICarouselItemProps) {
  return (
    <div
      onClick={onClick}
      className="h-full w-[200px] cursor-pointer sm:w-[300px] md:w-[400px] lg:w-[500px]"
    >
      <img
        src={content.imgURL}
        alt={content.title}
        onClick={onClick}
        className="h-[85%] w-full"
        style={{
          objectFit: "cover",
        }}
      />
      <Link href={`/pieces/${content.id}`}>
        <p className="-webkit-box line-clamp-1 overflow-hidden text-ellipsis text-[2.5rem] font-medium text-white">
          {content.title}
        </p>
      </Link>
      <p className="-webkit-box line-clamp-2 overflow-hidden text-ellipsis text-[1rem] font-normal text-white">
        {content.caption}
      </p>
    </div>
  );
}
