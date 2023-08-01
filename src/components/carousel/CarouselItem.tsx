import type { Content } from "@prisma/client";
import Link from "next/link";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface ICarouselItemProps {
  content: Content;
  onClick: () => void;
}

export default function CarouselItem({ content, onClick }: ICarouselItemProps) {
  return (
    <Card
      sx={{ width: 300, height: 400, marginTop: "3rem" }}
      onClick={onClick}
      style={{
        cursor: "pointer",
      }}
    >
      <CardMedia
        sx={{ height: 250 }}
        image={content.imgURL}
        title={content.title}
      />
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          className="-webkit-box overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {content.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="-webkit-box overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {content.caption}
        </Typography>
      </CardContent>
      <CardActions
        style={{
          padding: "0 0 0.5rem",
        }}
      >
        <Link href={`/pieces/${content.id}`}>
          <Button size="small">View</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
