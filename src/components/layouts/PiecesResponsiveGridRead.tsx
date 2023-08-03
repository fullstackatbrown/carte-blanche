import type { Content } from "@prisma/client";
import Link from "next/link";

import { type Layouts, Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface PiecesResponsiveGridReadProps {
  pieces: Content[];
  layout: Layouts | null;
}

/**
 * Toggle static property of all pieces in the layout
 * @param layout layout saved in the database
 * @returns the layout with all pieces set to static
 */
const toggleStatic = (layout: Layouts) => {
  const newLayout: Layouts = {};
  Object.keys(layout).forEach((key) => {
    newLayout[key] = layout[key]!.map((item) => {
      return {
        ...item,
        static: true,
      };
    });
  });
  return newLayout;
};

export default function PiecesResponsiveGridRead({
  pieces,
  layout,
}: PiecesResponsiveGridReadProps) {
  return (
    <ResponsiveGridLayout
      className="layout basis-full"
      rowHeight={300}
      width={1000}
      layouts={layout ? toggleStatic(layout) : {}}
      breakpoints={{ lg: 1200, md: 768, sm: 480, xs: 0 }}
      cols={{ lg: 6, md: 6, sm: 4, xs: 2 }}
    >
      {pieces.map((piece) => {
        return (
          <div
            key={piece.id}
            data-grid={{
              x: 0,
              y: 0,
              w: 3,
              h: 1,
              maxW: 3,
              maxH: 10,
              static: true,
            }}
            className="cursor-pointer transition duration-500 hover:scale-110"
          >
            <Link href={`/pieces/${piece.id}`} key={piece.id}>
              <img
                src={piece.imgURL}
                className="h-full w-full bg-gray-50 object-cover"
              />
            </Link>
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
}
