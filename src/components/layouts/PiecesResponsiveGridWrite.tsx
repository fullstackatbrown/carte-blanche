import { api } from "@CarteBlanche/utils/api";
import { CircularProgress } from "@mui/material";

import {
  type Layout,
  type Layouts,
  Responsive,
  WidthProvider,
} from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function PiecesResponsiveGridWrite() {
  const getLayouts = (): Layouts => {
    const savedLayouts = localStorage.getItem("layout");
    return savedLayouts ? (JSON.parse(savedLayouts) as Layouts) : {};
  };

  const handleLayoutChange = (layout: Layout[], layouts: Layouts) => {
    localStorage.setItem("layout", JSON.stringify(layouts));
  };

  const {
    data: pieces,
    isLoading: piecesLoading,
    error: piecesError,
  } = api.content.getAllTextAndImageContent.useQuery(
    {},
    { refetchOnWindowFocus: false }
  );

  if (piecesLoading || piecesError) {
    return (
      <CircularProgress
        sx={{ position: "absolute", top: "50%", left: "50%" }}
      />
    );
  }

  return (
    <ResponsiveGridLayout
      className="layout basis-full"
      rowHeight={300}
      width={1000}
      layouts={getLayouts()}
      onLayoutChange={handleLayoutChange}
      breakpoints={{ lg: 1200, md: 768, sm: 480, xs: 0 }}
      cols={{ lg: 6, md: 6, sm: 4, xs: 2 }}
    >
      {pieces.map((piece) => {
        return (
          <div
            key={piece.id}
            className="cursor-pointer transition duration-500 hover:scale-110"
          >
            <img
              src={piece.imgURL}
              className="h-full w-full bg-gray-50 object-cover"
            />
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
}
