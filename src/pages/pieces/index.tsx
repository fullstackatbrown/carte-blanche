import { api } from "@CarteBlanche/utils/api";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import CircularSpinner from "@CarteBlanche/components/CircularSpinner";
import TopNav from "@CarteBlanche/components/TopNav";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar } from "@mui/material";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Pieces() {
  const { data: session } = useSession();

  const { data: user } = api.user.getUser.useQuery(
    { id: session?.user.id },
    { refetchOnWindowFocus: false }
  );
  const canEditLayout = user?.role === "ADMIN";
  const canUploadContent = canEditLayout || user?.role === "WRITER";

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

  const {
    data: pieces,
    isLoading,
    error,
  } = api.content.getAllContent.useQuery({}, { refetchOnWindowFocus: false });

  if (isLoading || !pieces) {
    return <CircularSpinner />;
  }
  if (error) {
    return <p>Oh no... {error.message}</p>;
  }
  return (
    <>
      <TopNav />
      <button className="bg-slate-300">
        <a href="./upload">Click me to Upload!</a>
      </button>
      <div className="flex">
        <div className="absolute top-1/2">
          <p className="text-transform: lowercase">Vous Avez</p>
          <h1 className="text-transform: uppercase">Carte Blanche</h1>

          {canUploadContent && (
            <Link href="/upload">
              <Avatar style={{ backgroundColor: "#2196f3", cursor: "pointer" }}>
                <AddIcon />
              </Avatar>
            </Link>
          )}
          {canEditLayout && (
            <Avatar
              style={{ backgroundColor: "#2196f3", cursor: "pointer" }}
              onClick={() => setIsEditing(!isEditing)}
            >
              <EditIcon />
            </Avatar>
          )}
        </div>
        <ResponsiveGridLayout
          key={isEditing.toString()}
          className="layout"
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
                  x: colScale * (idx % colScale),
                  y: colScale * (idx / colScale),
                  w: 4,
                  h: 3,
                  maxW: 3,
                  maxH: 10,
                  static: !isEditing,
                }}
              >
                <h1>{piece.title} </h1>
              </div>
            );
          })}
        </ResponsiveGridLayout>
      </div>
    </>
  );
}
