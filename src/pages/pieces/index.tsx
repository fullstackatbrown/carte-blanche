import { api } from "@CarteBlanche/utils/api";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import CircularSpinner from "@CarteBlanche/components/CircularSpinner";
import PiecesSidebar from "@CarteBlanche/components/PiecesSidebar";
import TopNav from "@CarteBlanche/components/TopNav";
import { Button } from "@mui/material";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Pieces: NextPage = () => {
  const { data: session } = useSession();

  const { data: user } = api.user.getUser.useQuery(
    { id: session?.user.id },
    { refetchOnWindowFocus: false }
  );

  const [isEditing, setIsEditing] = useState(false);

  const [colScale, setColScale] = useState(12);
  const maxPiecesPerRow = 3;
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setColScale(12 / maxPiecesPerRow);
      } else if (window.innerWidth > 996) {
        setColScale(10 / maxPiecesPerRow);
      } else if (window.innerWidth > 768) {
        setColScale(6 / maxPiecesPerRow);
      } else if (window.innerWidth > 480) {
        setColScale(4 / maxPiecesPerRow);
      } else {
        setColScale(2 / maxPiecesPerRow);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Handles saving of the grid layout
   */
  const saveGridLayout = () => {
    alert("Not implemented yet!");
    setIsEditing(false);
  };

  const {
    data: pieces,
    isLoading,
    error,
  } = api.content.getAllTextAndImageContent.useQuery(
    {},
    { refetchOnWindowFocus: false }
  );

  if (isLoading || !pieces) {
    return <CircularSpinner />;
  }
  if (error) {
    return <p>Oh no... {error.message}</p>;
  }
  return (
    <>
      <TopNav />
      {isEditing && (
        <div className="bg-cyan-300">
          <h1>EDITING MODE</h1>
          <Button onClick={() => setIsEditing(!isEditing)}>Cancel</Button>
          <Button onClick={saveGridLayout}>Save</Button>
        </div>
      )}
      <div className="flex min-h-screen">
        <PiecesSidebar user={user ?? undefined} setIsEditing={setIsEditing} />
        <ResponsiveGridLayout
          key={isEditing.toString()}
          className="layout basis-3/4"
          rowHeight={30}
          width={1200}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        >
          {pieces.map((piece, idx) => {
            return (
              <div
                key={piece.id}
                data-grid={{
                  x: 0,
                  y: 0,
                  w: 3,
                  h: 8,
                  maxW: 3,
                  maxH: 10,
                  static: !isEditing,
                }}
                className="cursor-pointer transition duration-500 hover:scale-110"
              >
                {isEditing ? (
                  <img
                    src={piece.imgURL}
                    className="h-full w-full bg-gray-50 object-cover"
                  />
                ) : (
                  <Link href={`/pieces/${piece.id}`} key={piece.id}>
                    <img
                      src={piece.imgURL}
                      className="h-full w-full bg-gray-50 object-cover"
                    />
                  </Link>
                )}
              </div>
            );
          })}
        </ResponsiveGridLayout>
      </div>
    </>
  );
};

export default Pieces;
