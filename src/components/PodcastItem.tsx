import type { Content } from "@prisma/client";
import { useRouter } from "next/router";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";

interface IPodcastItemProps {
  podcast: Content;
}

export default function PodcastItem({ podcast }: IPodcastItemProps) {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => void router.push(podcast.content ?? "/")}
        className="relative m-auto h-60 w-4/5 cursor-pointer lg:w-1/4"
      >
        <span className="absolute bottom-0 left-0 m-4 text-lg text-white">
          {podcast.title}
        </span>
        <span className="absolute bottom-0 right-0 m-4">
          <PlayCircleIcon
            style={{
              height: "30px",
              width: "30px",
              color: "white",
            }}
          />
        </span>
        <img
          src={podcast.imgURL}
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
      {/* <div className="m-auto flex w-4/5">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRzCvck8iyrbwMYvSPlsyWjZVABYd0p818-nvcKlnvmQyjnbT5XIvtPcqxo209OFtLVP4&usqp=CAU"
          className="w=10 h-10 rounded-lg object-cover"
        />
        <p>TODO: Title of Podcast</p>
      </div> */}
    </>
  );
}
