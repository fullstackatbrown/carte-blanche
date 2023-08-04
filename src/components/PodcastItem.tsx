import type { Content } from "@prisma/client";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";

interface IPodcastItemProps {
  podcast: Content;
}

export default function PodcastItem({ podcast }: IPodcastItemProps) {
  return (
    <a href={podcast.content ?? "/"} className="relative">
      <div className="absolute bottom-0 left-0 z-10 flex w-full justify-between p-2">
        <span className="text-lg text-white">{podcast.title}</span>
        <span>
          <PlayCircleIcon
            sx={{
              height: "30px",
              width: "30px",
              color: "white",
            }}
          />
        </span>
      </div>
      <img
        src={podcast.imgURL}
        className="h-80 rounded-lg object-cover brightness-75"
        alt={podcast.title}
      />
    </a>
  );
}
